const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullnames: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    default: false,
  },
});

//Indexes for improving query performance
UserSchema.index({ fullnames: 1 });
UserSchema.index({ email: 1 });

module.exports = mongoose.model("User", UserSchema);
