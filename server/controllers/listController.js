const mongoose = require('mongoose');
const List = require('../models/listModel');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

// Create: HTTP POST /api/lists
createList = async (request, response) => {

  if (!request.body.name) {
    return response.status(422).json({ success: false, error: 'Please provide a list name.' });
  };

  newUUID = uuidv4();
  const newList = new List( {'UUID': newUUID, ...request.body} );

  await newList
    .save()
    .then(() => {
      return response.status(201).json({ 
        success: true, 
        message: `List '${request.body.name}' was created.`, 
        'list uri': `/lists/${newUUID}`
      })
    })
    .catch(saveError => {
      return response.status(500).json({
        success: false, 
        message: 'Error saving the new list.',      
        error: saveError
      });
    });
};

// Read: HTTP GET /api/lists/{listId} 
// (list must be identified by ID, overview of lists is not available)
readList = async (request, response) => {

  const listId = request.params['listId'];
  if (!uuidValidate(listId)) {
    return response.status(422).json({ success: false, error: 'List ID is not valid.' })
  }

  await List.findOne({ 'UUID': listId })
    .select('-_id -__v -items._id -createdAt -updatedAt')
    .populate('items.category',  { _id: 0, __v: 0 })
    .exec((error, queryResult) => {
      if (error) {
        return response.status(500).json({ success: false, message: 'Error fetching the list', error: error });
      }
      if (!queryResult) {
        return response.status(404).json({ success: false, error: 'List not found.' });
      }

      // if more than one item in list: sort items by name and then by category
      if (queryResult.items.length > 1) {
        queryResult.items.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        queryResult.items.sort((a, b) => {
          if (a.category && b.category) { 
            if (a.category.name < b.category.name) {
              return -1;
            }
            if (a.category.name > b.category.name) {
              return 1;
            }
            return 0;
          }
          return -1;
        });
      }

      return response.status(200).json({ 
        success: true,
        'list uri': `/lists/${listId}`,
        'list': queryResult
      });
    });
};

// Delete: HTTP DELETE /api/lists/{listId}
deleteList = async (request, response) => {

  const listId = request.params['listId'];
  if (!uuidValidate(listId)) {
    return response.status(422).json({ success: false, error: 'List ID is not valid.' })
  }
 
  await List.deleteOne({'UUID': listId}, (error, queryResult) => {
    if (error) {
        return response.status(500).json({ success: false, message: 'Error deleting list.', error: error });
    }
    if (queryResult.ok === 1) {
      return response
        .status(200)
        .json({ 
          success: true, 
          message: `Lists matching: ${queryResult.n}. Lists deleted: ${queryResult.deletedCount}.` });
    }
    return response.status(500).json({ success: false, error: 'List deletion result not "ok"', queryResult});
  });
};

module.exports = {
  createList,
  readList,
  deleteList
};