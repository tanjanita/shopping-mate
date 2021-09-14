const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  UUID: {
    type: String,
    required: [true, "UUID is missing."]
  },
  name: {
    type: String,
    required: [true, "Please provide a name for the item."]
  },
  status: {
    type: String,
    required: [true, "Item status is missing."]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
});

module.exports = { "itemSchema": itemSchema, "Item": mongoose.model("Item", itemSchema) };