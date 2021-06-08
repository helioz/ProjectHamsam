const mongoose = require('mongoose');
const Env = require('./environment');

// Connect to mongoDB
mongoose.connect(Env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', _ => {
  console.log('Database connected:', Env.MONGO_URL);
});

db.on('error', err => {
  console.error('connection error:', err);
});

module.exports = db;