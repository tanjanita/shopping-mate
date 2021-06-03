const mongoose = require("mongoose");
const Category = require("../models/categoryModel");
const Item = require("../models/itemModel");

createCategory = async (request, response) => {

  if (!request.body.name) {
    return response.status(422).json({
      success: false,
      error: "Please provide a category name.",
    });
  };

  const newCategory = new Category({name: request.body.name});

    newCategory
      .save()
      .then(() => {
        return response.status(201).json({
          success: true,
          message: "Category created.",
        })
      })
      .catch(error => {
        console.log("Error:", error);
        return response.status(422).json({
          error,
          message: "Category not created.",
        });
      });
};

getCategories = async (request, response) => {

  await Category.find({}, (error, categories) => {
    if (error) {
      return response.status(400).json({ success: false, error: error });
    }
    if (!categories.length) {
      return response
        .status(404)
        .json({ success: false, error: "Category not found." });
    }
    return response.status(200).json(categories);
  })
    .catch(error => console.log(error));
};

updateCategory = async (request, response) => {

  const categoryId = request.body._id;

  if (!categoryId) {
      return response.status(400).json({
          success: false,
          error: "Please provide a category ID.",
      })
  }

  if (mongoose.Types.ObjectId.isValid(categoryId)) {

    Category.findOne({ _id: categoryId }, (error, category) => {
      if (error) {
        console.log(error);
        return response.status(404).json({
          error: error,
          message: "Category not found.",
        });
      }
      category.name = request.body.value;
      category
        .save()
        .then((result) => {
          // console.log(result);
          return response.status(200).json({
            success: true,
            message: "Category updated.",
          })
        })
        .catch(error => {
          return response.status(422).json({
            error: error,
            message: "Category not updated.",
          });
        });
    });

  } else {
    return response.status(422).json({
      error: error,
      message: "Category ID not valid.",
    });
  }
}

deleteCategories = async (request, response) => {

  // First, delete any matching category parameters from items
  Item.find({ "category" : request.body._id } )
    .populate("category")
    .exec((err, items) => {
      items.forEach(function(item) {
        item.category = undefined;
        item.save();
      });
    });

  // Second, delete the category document
  await Category.deleteOne({ "_id" : request.body._id }, (error, result) => {
    if (error) {
      return response.status(422).json({ success: false, error: error });
    }
    if (result.ok === 1) {
      console.log(result);
      return response
      .status(200)
        .json({ success: true, message: `Categories matching: ${result.n}. Categories deleted: ${result.deletedCount}.` });
      }
      return response.status(422).json({ success: false, error: "Could not process request"});
  })
  .catch(error => console.log(error));

};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategories
};