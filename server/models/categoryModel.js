const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  UUID: {
    type: String,
    required: [true, "UUID is missing."]
  },
  name: {
    type: String,
    required: [true, "Please provide a name for the category."]
  }
});

module.exports = mongoose.model("Category", categorySchema);