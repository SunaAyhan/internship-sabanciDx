const express = require('express');
const { MongoClient } = require('mongodb');
async function connectDatabase() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'performance_data';
  
    const client = new MongoClient(url, { useUnifiedTopology: true });
  
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      const db = client.db(dbName);
      return db;
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      throw err;
    }
  }
  
  fastify.register(require('@fastify/cors'), (instance) => {
      return (req, callback) => {
        const corsOptions = {
          origin: true
        };
  
        // do not include CORS headers for requests from localhost
        if (/^localhost$/m.test(req.headers.origin)) {
          corsOptions.origin = false;
        }
  
        // callback expects two parameters: error and options
        callback(null, corsOptions);
      };
    });
  
  fastify.post('/save-performance-data', async (request, reply) => {
    const db = await connectDatabase();
    const performanceData = db.collection('performance_metrics');
    const data = request.body;
  
    try {
      await performanceData.insertOne(data);
      reply.send({ success: true, message: 'Veri başarıyla kaydedildi.' });
    } catch (err) {
      reply.status(500).send({ success: false, message: 'Veri kaydedilirken bir hata oluştu.' });
    }
  });
  
  fastify.listen({ port: 3000 }, (err) => {
    if (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    }
    console.log('Server listening on port 3000');
  });
