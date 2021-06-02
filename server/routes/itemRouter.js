const express = require('express');
const ItemController = require('../controllers/itemController');

const itemRouter = express.Router();

itemRouter.post('/shoppingItem', ItemController.createItem);
itemRouter.get('/shoppingItems', ItemController.getItems);
itemRouter.patch('/shoppingItem', ItemController.updateItem);
itemRouter.delete('/shoppingItems', ItemController.deleteItems);

module.exports = itemRouter;