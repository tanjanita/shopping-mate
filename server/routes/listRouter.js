const express = require('express');
const ListController = require('../controllers/listController');

const listRouter = express.Router();

listRouter.post('/api/lists', ListController.createList);
listRouter.get('/api/lists/:listId', ListController.readList);
listRouter.delete('/api/lists/:listId', ListController.deleteList);

module.exports = listRouter;