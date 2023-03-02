const mongoose = require("mongoose");

//new schema instance which takes in an object with all different fields (pair key-values) that we want to include, id is handled by mongodb
const IdeaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please add a text field"],
  },
  tag: {
    type: String,
    required: [true, "Please add a tag name"],
  },
  username: {
    type: String,
    required: [true, "Please add a name"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
//name of the model => 'Idea', and pass schema => IdeaSchema
module.exports = mongoose.model("Idea", IdeaSchema);
