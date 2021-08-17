const mongoose = require("mongoose");
const List = require("../models/listModel");
const Item = require("../models/itemModel");

// // first way:

// let newMessage = {title: "new title", msg: "new Message"}
// let result = await Contact.findById(id);
// result.messages.push(newMessage);
// await result.save();

// // second way

// let result = await Contact.findByIdAndUpdate(
//         id,
//         {$push: {"messages": {title: title, msg: msg}}},
//         {upsert: true, new : true})

createItem = async (request, response) => {

  if (!request.body.name) {
    return response.status(422).json({
      success: false,
      error: "Please provide the item name.",
    });
  };

  // add checks if listID is given/valid/found 
  // > might create function for this, as this happens repeatedly
  
  const listID = request.params['id'];
  const newItem = new Item( {...request.body, ...{status: "Pending"}} );

  let result = await List.findById(listID);
  // console.log(result);
  result.items.push(newItem);
  await result.save()
    .then(() => {
      return response.status(201).json({
        success: true,
        message: "Item added to this list.",
      })
    })
    .catch(error => {
      console.log("Error:", error);
      return response.status(422).json({
        error,
        message: "Could not create item.",
      });
    });
};

getItems = async (request, response) => {

  const listID = request.params['id'];
  // add ID check, valid/missing

  await List.findById(listID)
  .populate('items.category')
  .sort({'items.category.name': 'ascending', 'items.name': 'ascending'})
  .exec((error, queryResult) => {
      if (error) {
        return response.status(400).json({ success: false, error: error });
      }
      if (!queryResult) {
        return response
          .status(404)
          .json({ success: false, error: "No matching list found." });
      }
      if (queryResult.items) {
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
        // queryResult.items = sortedCategoryNames;
      }
      return response.status(200).json(queryResult);
    });
};

updateItem = async (request, response) => {

  const itemId = request.body._id;

  if (!itemId) {
      return response.status(400).json({
          success: false,
          error: "Please provide an item ID to update.",
      })
  }

  if (mongoose.Types.ObjectId.isValid(itemId)) {

    Item.findOne({ _id: itemId }, (error, item) => {
      if (error || item === null) {
        return response.status(404).json({
          error,
          message: "Item not found.",
        });
      }
      item.status = request.body.value;
      item
        .save()
        .then(() => {
          return response.status(200).json({
            success: true,
            id: item._id,
            message: "Item updated.",
          })
        })
        .catch(error => {
          return response.status(422).json({
            error,
            message: "Item not updated.",
          });
        });
    });

  } else {
    return response.status(404).json({
      success: false,
      message: "Item ID not valid.",
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
      return response.status(422).json({ success: false, error: "Could not process request"});
    })
    .catch(error => console.log(error));
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItems
};