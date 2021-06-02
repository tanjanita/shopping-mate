const express = require('express');
const CategoryController = require('../controllers/categoryController');

const categoryRouter = express.Router();

categoryRouter.post('/category', CategoryController.createCategory);
categoryRouter.get('/categories', CategoryController.getCategories);
categoryRouter.patch('/category', CategoryController.updateCategory);
categoryRouter.delete('/categories', CategoryController.deleteCategories);

module.exports = categoryRouter;