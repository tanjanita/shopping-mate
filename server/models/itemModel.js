const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the item."]
  },
  status: {
    type: String,
    required: [true, "Please a status for the item."]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
});

module.exports = mongoose.model("Item", itemSchema);