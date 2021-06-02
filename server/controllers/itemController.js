const mongoose = require('mongoose');
const Item = require('../models/itemModel');


createItem = async (request, response) => {

  if (!request.body.name) {
    return response.status(422).json({
      success: false,
      error: 'Please provide the item name.',
    });
  };

  const newItem = new Item({name: request.body.name, status: "Pending"});

    newItem
      .save()
      .then(() => {
        return response.status(201).json({
          success: true,
          message: 'Item created!',
        })
      })
      .catch(error => {
        console.log("Error:", error);
        return response.status(422).json({
          error,
          message: 'Item not created!',
        });
      });
};

getItems = async (request, response) => {

  await Item.find({}, (error, items) => {
    if (error) {
      return response.status(400).json({ success: false, error: error });
    }
    if (!items.length) {
      return response
        .status(404)
        .json({ success: false, error: `Item not found` });
    }
    return response.status(200).json(items);
  })
    .catch(error => console.log(error));
};

updateItem = async (request, response) => {

  const itemId = request.body._id;

  if (!itemId) {
      return response.status(400).json({
          success: false,
          error: 'Please provide an item ID to update.',
      })
  }

  if (mongoose.Types.ObjectId.isValid(itemId)) {

    Item.findOne({ _id: itemId }, (error, item) => {
      if (error) {
        return response.status(404).json({
          error,
          message: 'Item not found!',
        });
      }
      item.status = request.body.value;
      item
        .save()
        .then(() => {
          return response.status(200).json({
            success: true,
            id: item._id,
            message: 'Item updated!',
          })
        })
        .catch(error => {
          return response.status(422).json({
            error,
            message: 'Item not updated!',
          });
        });
    });

  } else {
    return response.status(404).json({
      error,
      message: 'Item ID not valid.',
    });
  }

}

deleteItems = async (request, response) => {

  const deletionFilter = {[request.body.field]: request.body.value};

    await Item.deleteMany(deletionFilter, (error, result) => {
      if (error) {
          return response.status(400).json({ success: false, error: error });
      }
      if (result.ok === 1) {
        return response
          .status(200)
          .json({ success: true, message: `Items matching: ${result.n}. Items deleted: ${result.deletedCount}.` });
      }
      return response.status(422).json({ success: false, error: 'Could not process request'});
    })
    .catch(error => console.log(error));
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItems
};