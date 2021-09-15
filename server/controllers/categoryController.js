const mongoose = require('mongoose');
const Category = require('../models/categoryModel');
const List = require('../models/listModel');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

const uriBase = 'localhost:33333/api';

// Create: HTTP POST /api/categories (available only for admin)
createCategory = async (request, response) => {

  if (!request.body.name) {
    return response.status(422).json({ success: false, error: 'Please provide a category name.' });
  };

  newUUID = uuidv4();
  const newCategory = new Category({ 'UUID': newUUID, ...request.body });

  newCategory
    .save()
    .then(() => {
      return response.status(201).json({
        success: true,
        message: `Category '${request.body.name}' was created.`, 
        'categories list uri': `${uriBase}/categories`
      })
    })
    .catch(saveError => {
      return response.status(422).json({
        success: false, 
        message: 'Error saving the list.',
        error: saveError
      });
    });
};

// Read: HTTP GET /api/categories
readCategories = async (request, response) => {

  // await Category.find({}, (error, queryResult) => {
  Category.find({})
    .select('-_id -__v')
    .sort('name')
    .exec()
    .then(queryResult => {
      if (!queryResult.length) {
        return response.status(404).json({ success: false, error: 'Categories not found.' });
      }
      return response.status(200).json({ 
        success: true,
        'categories list uri': `${uriBase}/categories`,
        'categories list': queryResult
      });
    })
    .catch(findError => {
      return response.status(500).json({ success: false, message: 'Error fetching categories.', error: findError });
    });
};

// Update: HTTP PATCH /api/categories/{categoryId} (available only for admin)
updateCategory = async (request, response) => {

  const categoryId = request.params['categoryId'];
  if (!uuidValidate(categoryId)) {
    return response.status(422).json({ success: false, error: 'Category ID is not valid.' })
  }

  Category.findOneAndUpdate(
    { 'UUID': categoryId },
    { '$set': { 'name': request.body.name } },
    function(error, queryResult) {
      if (error) {
        return response.status(400).json({ success: false, error: error });
      }
      if (!queryResult) {
        return response.status(404).json({ success: false, error: `Category with ID '${categoryId}' not found.` });
      }
      return response.status(200).json({
            success: true,
            message: 'Category name updated.',
            'category list uri': `${uriBase}/categories`
      });
    }
  );
}

// Delete: HTTP DELETE /api/categories/{categoryId} (available only for admin)
deleteCategory = async (request, response) => {

  // check for valid category ID
  const categoryId = request.params['categoryId'];
  if (!uuidValidate(categoryId)) {
    return response.status(422).json({ success: false, error: 'Category ID is not valid.' })
  }

  // First, pull ObjectId from categories
  const categoryObjectId = await Category.findOne({ 'UUID' : categoryId } )
    .select('_id')
    .exec();

  // Continue if a matching category was found ...
  if (categoryObjectId) {

    // Second, set matching list.items.category parameters to null
    List.updateMany(
      { 'items.category' : categoryObjectId._id },
      { '$unset': { 'items.$[i].category': '' } }, // $unset will remove the field, regardless of value given
      { arrayFilters: [{'i.category': categoryObjectId._id}] },
      function(error, queryResult) {
        if (error) {
          return response.status(500).json({ success: false, message: 'Error removing category from existing list items.', error: error });
        }
        // there should always be a result, even if no records match, e.g.:
        // queryResult { n: 2, nModified: 2, ok: 1 }
        // queryResult { n: 0, nModified: 0, ok: 1 }
      }
    );
    
    // Third, remove category from categories
    await Category.deleteOne({'UUID': categoryId}, (error, queryResult) => {
      if (error) {
        return response.status(500).json({ success: false, message: 'Error deleting category from categories.', error: error });
      }
      if (queryResult.ok === 1) {
        return response
        .status(200)
        .json({ 
          success: true, 
          message: `Categories matching: ${queryResult.n}. Categories deleted: ${queryResult.deletedCount}.`, 
          'category list uri': `${uriBase}/categories` 
        });
      }
      return response.status(400).json({ success: false, message: 'Category deletion result not "ok"', queryResult});
    });

  // ... or report back if no matching category was found
  } else {
    return response.status(404).json({ success: false, error: `Category with ID '${categoryId}' not found.`});
  }
};

module.exports = {
  createCategory,
  readCategories,
  updateCategory,
  deleteCategory
};