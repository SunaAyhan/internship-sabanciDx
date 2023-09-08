const fastify = require("fastify")();
const { MongoClient } = require("mongodb");
const bcrypt = require('bcryptjs');
const saltRounds = 1;
async function connectDatabase() {
  const url = "mongodb://localhost:27017";
  const dbName = "performance_data";

  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

fastify.register(require("@fastify/cors"), (instance) => {
  return (req, callback) => {
    const corsOptions = {
      origin: true,
    };

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false;
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions);
  };
});

fastify.register(async function (fastify) {
  fastify.post("/save-performance-data", async (request, reply) => {
    const db = await connectDatabase();
    const performanceData = db.collection("performance_metrics");
    const data = request.body;
    data.timestamp = new Date(data.timestamp);
    console.log(data);
    try {
      await performanceData.insertOne(data);
      reply.send({ success: true, message: "Veri başarıyla kaydedildi." });
    } catch (err) {
      reply
        .status(500)
        .send({
          success: false,
          message: "Veri kaydedilirken bir hata oluştu.",
        });
      console.log(err);
    }
  });
});

fastify.get("/get-performance-data", async (request, reply) => {
  const db = await connectDatabase();
  const performanceData = db.collection("performance_metrics");

  try {
    const data = await performanceData.find().sort({ _id: -1 }).toArray();
    reply.send({ success: true, data });
  } catch (err) {
    reply
      .status(500)
      .send({ success: false, message: "Veri alınırken bir hata oluştu." });
  }
});

fastify.get("/get-daily-avarage", async (request, reply) => {
  const db = await connectDatabase();
  const performanceData = db.collection("performance_metrics");
  const dailyAvaragePipeline = [
    {
      $group: {
        _id: {
          year: { $year: "$timestamp" },
          month: { $month: "$timestamp" },
          day: { $dayOfMonth: "$timestamp" },
        },

        avgLCP: { $avg: "$lcp" },
        avgDnsTime: { $avg: "$dnsTime" },
        avgConnectionTime: { $avg: "$connectionTime" },
        avgResponseTime: { $avg: "$responseTime" },
        avgDomContentLoadedEventTime: { $avg: "$domContentLoadedEventTime" },
        avgFCP: { $avg: "$fcp" },
        avgFirstPaint: { $avg: "$firstPaint" },
        avgLoadEventTime: { $avg: "$loadEventTime" },
        avgNavigationType: { $avg: "$navigationType" },
        avgRedirectCount: { $avg: "$redirectCount" },
        avgNavigationStartTime: { $avg: "$navigationStartTime" },
        avgNavigationEndTime: { $avg: "$navigationEndTime" },
        avgTTFB: { $avg: "$ttfb" },
        avgCodeExecutionTime: { $avg: "$codeExecutionTime" },
      },
    },
    {
      $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 },
    },
  ];

  try {
    const data = await performanceData
      .aggregate(dailyAvaragePipeline)
      .toArray();
    reply.send({ success: true, data });
  } catch (err) {
    reply
      .status(500)
      .send({ success: false, message: "Veri alınırken bir hata oluştu." });
  }
});




fastify.get("/get-weekly-average", async (request, reply) => {
  const db = await connectDatabase();
  const performanceData = db.collection("performance_metrics");


  const weeklyAveragePipeline = [
    {
      $group: {
        _id: {
          week: { $week: "$timestamp" },
          year: { $year: "$timestamp" },
        },
        avgLCP: { $avg: "$lcp" },
        avgDnsTime: { $avg: "$dnsTime" },
        avgConnectionTime: { $avg: "$connectionTime" },
        avgResponseTime: { $avg: "$responseTime" },
        avgDomContentLoadedEventTime: { $avg: "$domContentLoadedEventTime" },
        avgFCP: { $avg: "$fcp" },
        avgFirstPaint: { $avg: "$firstPaint" },
        avgLoadEventTime: { $avg: "$loadEventTime" },
        avgNavigationType: { $avg: "$navigationType" },
        avgRedirectCount: { $avg: "$redirectCount" },
        avgNavigationStartTime: { $avg: "$navigationStartTime" },
        avgNavigationEndTime: { $avg: "$navigationEndTime" },
        avgTTFB: { $avg: "$ttfb" },
        avgCodeExecutionTime: { $avg: "$codeExecutionTime" },
      },
    },
    {
      $limit: 24,
    }
  ];

  try {
    const data = await performanceData
      .aggregate(weeklyAveragePipeline)
      .limit(24)
      .toArray();
    reply.send({ success: true, data });
  } catch (err) {
    reply
      .status(500)
      .send({ success: false, message: "Veri alınırken bir hata oluştu." });
  }
});


// kullanıcı işlemleri

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds); // Salt oluştur
  const hashedPassword = await bcrypt.hash(password, salt); // Şifreyi ve salt'ı kullanarak hashle
  return { hashedPassword, salt };
};


fastify.post("/backend-register-endpoint", async (request, reply) => {
  const db = await connectDatabase();
  const users = db.collection("users");
  const userData = request.body;

  try {
    // Kullanıcıyı veritabanına eklemek için önce e-posta adresinin veya kullanıcı adının kullanılıp kullanılmadığını kontrol edin
    const existingUser = await users.findOne({
      $or: [{ email: userData.email }, { username: userData.username }],
    });

    if (existingUser) {
      if (existingUser.email === userData.email) {
        reply.status(400).send({ success: false, message: "Bu e-posta adresi zaten kullanılıyor." });
      } else if (existingUser.username === userData.username) {
        reply.status(400).send({ success: false, message: "Bu kullanıcı adı zaten kullanılıyor." });
      }
      return;
    }

    const { hashedPassword, salt } = await hashPassword(userData.password);
    userData.password = hashedPassword;

    const result = await users.insertOne(userData);
    reply.send({ success: true, message: "Kullanıcı başarıyla kaydedildi." });
  } catch (error) {
    reply.status(500).send({ success: false, message: "Kullanıcı kaydedilirken bir hata oluştu." });
  }
});



// Kullanıcı girişi
fastify.post("/backend-login-endpoint", async (request, reply) => {
  const db = await connectDatabase();
  const users = db.collection("users");
  const { email, password } = request.body; // Kullanıcı adı ve gelen şifre

  try {
    // Kullanıcının veritabanındaki salt'ını ve hash'ini aldım
    const user = await users.findOne({ email });
    if (!user) {
      reply.status(401).send({ success: false, message: "Kullanıcı bulunamadı." });
      return;
    }

    // Girilen şifreyi ve salt'ı kullanarak veritabanındaki hash ile karşılaştırdım
    const isPasswordValid =  await bcrypt.compare(password,user.password)

    if (isPasswordValid) {
      reply.send({ success: true, message: "Giriş başarılı." });
    } else {
      reply.status(401).send({ success: false, message: "Şifre yanlış." });
    }
  } catch (error) {
    reply.status(500).send({ success: false, message: "Giriş yapılırken bir hata oluştu." });
  }
});

fastify.get("/get-users", async (request, reply) => {
  const db = await connectDatabase();
  const users = db.collection("users");

  try {
    const userList = await users.find().toArray();
    reply.send({ success: true, users: userList });
  } catch (error) {
    reply.status(500).send({ success: false, message: "Kullanıcıları getirirken bir hata oluştu." });
  }
});


// entities
fastify.post('/performance_data/entities', async (request, reply) => {
  const db = await connectDatabase();
  const entities = db.collection('entities'); // Veritabanı koleksiyonunuzu ayarlayın
  const data = request.body;

  try {
    // Veriyi veritabanına ekleyin
    const result = await entities.insertOne(data);
    reply.status(201).send({ success: true, message: 'Veri başarıyla eklendi.' });
  } catch (error) {
    console.error('Veri eklenirken bir hata oluştu:', error);
    reply.status(500).send({ success: false, message: 'Veri eklenirken bir hata oluştu.' });
  }
});

fastify.get('/performance_data/entities', async (req, res) => {
  try {
    // MongoDB veritabanına bağlan
    const uri = 'mongodb://localhost:27017'; // MongoDB bağlantı adresi
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Veritabanındaki "entities" koleksiyonunu seçin
    const db = client.db('performance_data'); // Veritabanı adınızı buraya ekleyin
    const collection = db.collection('entities'); // Koleksiyon adınızı buraya ekleyin

    // Tüm entities verilerini çekin
    const entities = await collection.find({}).toArray();

    // Sonuçları JSON olarak yanıtla
    res.send(entities);
  } catch (error) {
    console.error('Entities çekme hatası:', error);
    res.status(500).send('Entities çekme hatası: ' + error.message);
  } finally {
    client.close(); // Veritabanı bağlantısını kapatın
  }
});


fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
  console.log("Server listening on port 3000");
});
