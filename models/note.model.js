const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema(
  {
    title: String, // String is shorthand for {type: String}
    content: String,
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Note", NoteSchema);
