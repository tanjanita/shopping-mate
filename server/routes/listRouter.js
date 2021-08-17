const express = require('express');
const ListController = require('../controllers/listController');

const listRouter = express.Router();

listRouter.post('/lists', ListController.createList);
listRouter.get('/lists', ListController.getLists);
listRouter.patch('/lists', ListController.updateList);
listRouter.delete('/lists', ListController.deleteLists);

module.exports = listRouter;