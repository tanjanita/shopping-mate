const express = require('express');
const ItemController = require('../controllers/itemController');

const itemRouter = express.Router();

itemRouter.post('/api/lists/:listId/items', ItemController.createItem);
itemRouter.patch('/api/lists/:listId/items/:itemId', ItemController.updateItem);
itemRouter.delete('/api/lists/:listId/items', ItemController.deleteItems);

module.exports = itemRouter;