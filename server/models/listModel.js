const mongoose = require("mongoose");
const itemSchema = require("../models/itemModel").itemSchema;

const listSchema = new mongoose.Schema({
  UUID: {
    type: String,
    required: [true, "UUID is missing."]
  },
  name: {
    type: String,
    required: [true, "Please provide a name for your list."]
  },
  items: [
    itemSchema
  ]
},
{ timestamps: true });

listSchema.index({UUID: 1, 'items.UUID': 1}, {unique: true});
// restart server for index to show up in DB
// check index in mongoDB: db.getCollection('lists').getIndexes()
// disable autoindex? https://mongoosejs.com/docs/guide.html

module.exports = mongoose.model("List", listSchema);