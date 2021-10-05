require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB collection
mongoose.connect(process.env.DB_PATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Connection feedback
const db = mongoose.connection;
db.on('error', () => console.error('DB connection error'));
db.on('connected', () => {console.log('DB connected')});

module.exports = db;