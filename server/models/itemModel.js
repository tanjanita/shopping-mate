const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the shopping item."]
  },
  status: {
    type: String,
    required: [true, "Shopping item status is missing."]
  }
});

// const Item = mongoose.model("Item", itemSchema);
module.exports = mongoose.model("Item", itemSchema);


// ### Hard-coded insert of two items for initial collection setup
// const item1 = new Item({ name: "Muesli", status: "Pending" });
// const item2 = new Item({ name: "Yoghurt", status: "Pending" });

// Item.insertMany([item1, item2], function(error) {
//   if (error) {
//     console.error(">> insertMany", error);
//   } else {
//     console.log("Meowelous! We've added a couple of shopping items to your list.");
//     console.warn(">> Don't forget to comment this out!");
//   }
// });