const mongoose = require('mongoose');
// Connect to MongoDB collection
mongoose.connect('mongodb://localhost:27017/shoppingMateDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Connection feedback
const db = mongoose.connection;
db.on('error', () => console.error('DB connection error: ', error.message));
db.on('connected', () => {console.log('DB connected')});

module.exports = db;