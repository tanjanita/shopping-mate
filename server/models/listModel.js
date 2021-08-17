const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
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

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for your list."]
  },
  UUID: {
    type: String,
    required: [true, "UUID is missing."]
  },
  items: [
    itemSchema
  ]
},
{ timestamps: true });

module.exports = mongoose.model("List", listSchema);