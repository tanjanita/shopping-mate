const express = require('express');
const mongoose = require("mongoose");

const apiPort = 3333;
const app = express();
app.use(express.json());

// Connect to a MongoDB collection
mongoose.connect('mongodb://localhost:27017/shoppingMateDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Connection feedback
const db = mongoose.connection;
db.on('error', () => console.error('DB connection error: '));
db.once('open', () => {console.log('DB connected')});

// Server routes
app.get("/", (request, response) => {
  // console.log(request);
  response.write("<h1>Welcome to your Shopping Mate!</h1>");
  response.write("<p>Yey, you're out shopping with your mate :)</p>");
  response.write("<p>Let's split up the list so you'll be ready to sit down for a nice cuppa faster!</p>");
  response.send();
});

app.get("/shoppingItems",(request, response) => {
  console.log(request);
 
  ShoppingItems.get
  
});

// app.get("",(request, response) => {
//   console.log(request);
 
  
// });


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));