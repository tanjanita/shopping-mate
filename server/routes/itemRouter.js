const express = require('express');
const ItemController = require('../controllers/itemController');

const router = express.Router();

// CRUD: Read/display all shopping items
router.get('/shoppingItems', ItemController.getItems);
router.post('/shoppingItem', ItemController.createItem);
router.patch('/shoppingItem', ItemController.updateItem);
router.delete('/shoppingItems', ItemController.deleteItems);

module.exports = router;