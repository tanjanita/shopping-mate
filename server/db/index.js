require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB collection
mongoose.connect('mongodb+srv://' + process.env.DB_ADMIN + ':' + process.env.DB_ACCESS_PASS + '@cluster1.bkj7g.mongodb.net/shoppingMateDB?retryWrites=true&w=majority', {
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