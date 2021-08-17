const express = require("express");
const cors = require("cors");

// MongoDB connection via mongoose
const db = require('./db')
// Mongoose data models
const Item = require('./models/itemModel');
const Category = require('./models/categoryModel');
const List = require('./models/listModel');

// Server specs
const app = express();
const apiPort = 3333;
app.use(cors({origin: "http://localhost:3000"})); // enable api access from another origin/port
app.use(express.json()); // for parsing application/json

// Server root route
app.get("/", (request, response) => {
  response.write("<h1>shoppingMate App</h1>");
  response.write("<a href='/shoppingItems'>See a list of all shopping items</a>");
  response.send();
});

// Controller and route specs
const itemRouter = require('./routes/itemRouter');
const categoryRouter = require('./routes/categoryRouter');
const listRouter = require('./routes/listRouter');
app.use(itemRouter);
app.use(categoryRouter);
app.use(listRouter);

// Start server
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));