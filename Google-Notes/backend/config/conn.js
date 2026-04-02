const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected!");
  } catch (err) {
    console.log("MongoDB Failed to connect!", err);
  }
};

module.exports = connectDB;
