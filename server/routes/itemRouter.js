const express = require('express');
const ItemController = require('../controllers/itemController');

const itemRouter = express.Router();

itemRouter.post('/lists/:id/items', ItemController.createItem);
itemRouter.get('/lists/:id/items', ItemController.getItems);
itemRouter.patch('/shoppingItem', ItemController.updateItem);
itemRouter.delete('/shoppingItems', ItemController.deleteItems);

module.exports = itemRouter;