const fastify = require("fastify")();
const { MongoClient } = require("mongodb");
const bcrypt = require('bcryptjs');
const saltRounds = 10;
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
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// users
fastify.post("/backend-register-endpoint", async (request, reply) => {
  const db = await connectDatabase();
  const users = db.collection("users");
  const userData = request.body; // Gelen verileri alın

  try {
    // Kullanıcıyı veritabanına eklemek için şifreyi hashleyin
    userData.password = await hashPassword(userData.password);

    const result = await users.insertOne(userData);
    reply.send({ success: true, message: "Kullanıcı başarıyla kaydedildi." });
  } catch (error) {
    reply.status(500).send({ success: false, message: "Kullanıcı kaydedilirken bir hata oluştu." });
  }
});
const comparePasswords = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};


fastify.post("/backend-login-endpoint", async (request, reply) => {
  const db = await connectDatabase();
  const usersCollection = db.collection("users");

  const { email, password } = request.body;

  const user = await usersCollection.findOne({ email });

  if (!user) {
    reply.status(401).send({
      success: false,
      message: "Kullanıcı bulunamadı. Lütfen geçerli bir e-posta adresi ve şifre girin.",
    });
    return;
  }

  const passwordMatch = await comparePasswords(password, user.password);

  if (!passwordMatch) {
    reply.status(401).send({
      success: false,
      message: "Şifre yanlış. Lütfen geçerli bir e-posta adresi ve şifre girin.",
    });
    return;
  }

  reply.send({
    success: true,
    message: "Giriş başarılı.",
  });
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


fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
  console.log("Server listening on port 3000");
});
