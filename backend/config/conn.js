const mongoose = require("mongoose")

const MONGO_URI = process.env.MONGODB_URI

const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI)
        console.log("MongoDB Connected Successfully!")
    } catch (err) {
        console.log("Failed to connect to MongoDB: ", err)
    }
}

module.exports = connectDB