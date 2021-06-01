const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the category."]
  }
});

// const Category = mongoose.model("Category", categorySchema);
module.exports = mongoose.model("Category", categorySchema);