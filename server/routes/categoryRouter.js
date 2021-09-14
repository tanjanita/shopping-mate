const express = require('express');
const CategoryController = require('../controllers/categoryController');

const categoryRouter = express.Router();

categoryRouter.post('/api/categories', CategoryController.createCategory);
categoryRouter.get('/api/categories', CategoryController.readCategories);
categoryRouter.patch('/api/categories/:categoryId', CategoryController.updateCategory);
categoryRouter.delete('/api/categories/:categoryId', CategoryController.deleteCategory);

module.exports = categoryRouter;