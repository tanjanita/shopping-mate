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
db.on('connected', () => {console.log('DB connected')});


// Create a predefined schema/structure and model/template: ShoppingItem
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the shopping item."]
  },
  status: {
    type: String,
    required: [true, "Shopping item status is missing."]
  }
});
const Item = mongoose.model("Item", itemSchema);

// ### temporary: hard-coded insert of two shopping items
const si1 = new Item({ name: "Muesli", status: "Pending" });
const si2 = new Item({ name: "Yoghurt", status: "Pending" });

Item.insertMany([si1, si2], function(error) {
  if (error) {
    console.error(">> insertMany", error);
  } else {
    console.log("Meowelous! We've added a couple of shopping items to your list.");
    console.warn(">> Don't forget to comment this out!");
  }
});

// Create a predefined schema/structure and model/template: Category
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the category."]
  }
});
const Category = mongoose.model("Category", categorySchema);

// Server root route
app.get("/", (request, response) => {
  // console.log(request);
  response.write("<h1>Welcome to your Shopping Mate!</h1>");
  response.write("<p>Yey, you're out shopping with your mate :)</p>");
  response.write("<p>Let's split up the list so you can sit down for a nice cuppa sooner!</p>");
  response.write("<a href='/shoppingItems'>See a list of all shopping items</a>");
  response.send();
});
// Get all shopping items > list
app.get("/shoppingItems", (request, response) => {
 
  ShoppingItem.find(function(error, items) {
    if (!error) {
      // items.forEach( item => console.log(item.name) );
      response.send(items);
    } 
  });
  
});
// Post a new item
app.get("/shoppingItems", (request, response) => {
 
  ShoppingItem.find(function(error, items) {
    if (!error) {
      // items.forEach( item => console.log(item.name) );
      response.send(items);
    } 
  });
  
});



app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));