const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the category."]
  }
});

module.exports = mongoose.model("Category", categorySchema);