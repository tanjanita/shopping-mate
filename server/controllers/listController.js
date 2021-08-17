const mongoose = require("mongoose");
const List = require("../models/listModel");

createList = async (request, response) => {

  if (!request.body.name) {
    return response.status(422).json({
      success: false,
      error: "Please provide a list name.",
    });
  };

  const newList = new List( {...request.body} );

  newList
    .save()
    .then(() => {
      return response.status(201).json({
        success: true,
        message: "List created.",
      })
    })
    .catch(error => {
      console.log("Error:", error);
      return response.status(422).json({
        error,
        message: "List not created.",
      });
    });
};

getLists = async (request, response) => {

  await List.find({})
    .sort({name: 1})
    .populate('category')
    .exec((error, lists) => {
      if (error) {
        return response.status(400).json({ success: false, error: error });
      }
      if (!lists.length) {
        return response
          .status(404)
          .json({ success: false, error: "List not found." });
      }
      return response.status(200).json(lists);
    });
    // .catch(error => console.log(error));
};


updateList = async (request, response) => {

  const listId = request.body._id;

  if (!listId) {
      return response.status(400).json({
          success: false,
          error: "Please provide an list ID to update.",
      })
  }

  if (mongoose.Types.ObjectId.isValid(listId)) {

    List.findOne({ _id: listId }, (error, list) => {
      if (error || list === null) {
        return response.status(404).json({
          error,
          message: "List not found.",
        });
      }
      list.name = request.body.name;
      list
        .save()
        .then(() => {
          return response.status(200).json({
            success: true,
            id: list._id,
            message: "List updated.",
          })
        })
        .catch(error => {
          return response.status(422).json({
            error,
            message: "List not updated. Please try again.",
          });
        });
    });

  } else {
    return response.status(404).json({
      success: false,
      message: "List ID not valid.",
    });
  }
}

deleteLists = async (request, response) => {

  if (request.body.field !== undefined && request.body.value !== undefined) {

    const deletionFilter = {[request.body.field]: request.body.value};
    console.log(deletionFilter);
  
    await List.deleteMany(deletionFilter, (error, result) => {
      if (error) {
          return response.status(400).json({ success: false, error: error, message: "Bad Request. No matches retrievable." });
      }
      if (result.ok === 1) {
        return response
          .status(200)
          .json({ success: true, message: `Lists matching: ${result.n}. Lists deleted: ${result.deletedCount}.` });
      }
      return response.status(422).json({ success: false, error: "Could not process request"});
    })
    .catch(error => console.log(error));

  } else {
    return response.status(400).json({
      success: false,
      message: "Please specify a field and value to select the list to be deleted.",
    });
  }
};

module.exports = {
  createList,
  getLists,
  updateList,
  deleteLists
};