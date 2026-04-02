const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
    },
  },
  { timestamps: true },
);

//Indexing for improving query performance
NoteSchema.index({ title: 1 });
NoteSchema.index({ content: 1 });

//Exporting model for settings global use in whole backend
module.exports = mongoose.model("Note", NoteSchema);
