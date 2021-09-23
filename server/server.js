require('dotenv').config();
const express = require('express');
const cors = require('cors');

// MongoDB connection via mongoose
const db = require('./db')
// Mongoose data models
const Item = require('./models/itemModel');
const Category = require('./models/categoryModel');
const List = require('./models/listModel');

// Server specs
const app = express();
const apiPort = process.env.PORT;
app.use(cors({origin: process.env.CORS_PATH})); // enable api access from another origin/port
app.use(express.json()); // for parsing application/json

// Server root route
app.get('/', (request, response) => {
  response.write('<h1>shoppingMate App</h1>');
  response.write('<a href="/shoppingItems">See a list of all shopping items</a>');
  response.send();
});

// Controller and route specs
const itemRouter = require('./routes/itemRouter');
const categoryRouter = require('./routes/categoryRouter');
const listRouter = require('./routes/listRouter');
app.use(itemRouter);
app.use(categoryRouter);
app.use(listRouter);

// Handle any wrong api address requests
app.all('*', (request, response) => {
  response.status(404).json({
    success: false,
    error: `Cannot find address ${request.originalUrl} on this server.`
  });
});

// Start server
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));