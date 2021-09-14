const mongoose = require('mongoose');
const List = require('../models/listModel');
const Item = require('../models/itemModel').Item;
const Category = require('../models/categoryModel');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

const uriBase = 'localhost:33333/api';

// Create: HTTP POST /api/lists/{listId}/items
createItem = async (request, response) => {

  // check mandatory list ID
  const listId = request.params['listId'];
  if (!uuidValidate(listId)) {
    return response.status(422).json({ success: false, error: 'List ID is not valid.' })
  }
  // check for mandatory item name
  if (!request.body.name) {
    return response.status(422).json({ success: false, error: 'Item name is missing.' });
  };

  // create new item
  newItemId = uuidv4();
  const newItem = new Item( {UUID: newItemId, name: request.body.name, status: 'Pending'} );

  // check for categoryId, if given: pull objectId and add it to newItem
  const categoryId = request.body.category;
  if (categoryId) {
    if (!uuidValidate(categoryId)) {
      return response.status(422).json({ success: false, error: 'Category ID is not valid.' })
    }
    // pull categoryObjectId
    const categoryObjectId = await Category.findOne({ 'UUID': categoryId })
      .select('_id')
      .exec()
      .then(queryResult => {
        if (!queryResult) {
          return response.status(404).json({ success: false, error: 'Category not found.' });
        }
        return queryResult._id;
      })
      .catch(findError => {
        return response.status(500).json({ success: false, message: 'Error fetching category.', error: findError });
      });

    // add categoryObjectId to newItem
    newItem.category = categoryObjectId;
  }

  // pull list
  const listFound = await List.findOne({'UUID': listId});
  // check if list was found or not
  if (listFound) {
    // push newItem into listFound, save and return response
    listFound.items.push(newItem);
    listFound.save()
      .then(() => {
        return response.status(201).json({
          success: true,
          message: 'Item added to list.',
          'list uri': `${uriBase}/lists/${listId}`
        })
      })
      .catch(error => {
        return response.status(500).json({ success: false, message: 'Error saving item to list.', error: error });
      });
  } else {
    return response.status(404).json({ success: false, error: 'List not found.' });
  }
};

// Update: HTTP PATCH /api/lists/{listId}/items/{itemId} 
// (only handling status updates, item names are not editable)
updateItem = async (request, response) => {

  const listId = request.params['listId'];
  const itemId = request.params['itemId'];
  if (!uuidValidate(listId) || !uuidValidate(itemId)) {
    return response.status(422).json({ success: false, error: 'List and/or item ID are not valid.' })
  }

  List.findOneAndUpdate(
    { 'UUID': listId, 'items.UUID': itemId },
    { '$set': { 'items.$.status': request.body.status } },
    function(error, queryResult) {
      if (error) {
        return response.status(500).json({ success: false, message: 'Error updating item status.', error: error });
      }
      if (!queryResult) {
        return response.status(404).json({ success: false, error: 'Item not found.' });
      }
      return response.status(200).json({
            success: true,
            message: 'Item status updated.',
            'list uri': `${uriBase}/lists/${listId}`
      });
    }
  );
};

// Delete: HTTP DELETE /api/lists/{listId}/items
// (all items with status "Done" in the list will be deleted)
deleteItems = async (request, response) => {

  const listId = request.params['listId'];
  if (!uuidValidate(listId)) {
    return response.status(422).json({ success: false, error: 'List ID is not valid.' })
  }

  List.updateOne(
    { 'UUID': listId },
    { '$pull': { items: { status: 'Done' } } },
    function(error, numberAffected) { 
      if (error) {
        return response.status(500).json({ success: false, message: 'Error deleting items', error: error });
      }
      if (numberAffected.n === 0) {
        return response.status(404).json({ success: false, error: 'List not found.' });
      }
      return response.status(200).json({
        success: true,
        message: "All items with status 'Done' were deleted from this list.",
        'list uri': `${uriBase}/lists/${listId}`
      })
    }
  );
};

module.exports = {
  createItem,
  updateItem,
  deleteItems
};