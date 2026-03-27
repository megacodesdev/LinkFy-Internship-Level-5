const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    fullNames: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    }
})

UserSchema.index({ fullNames: 1})
UserSchema.index({email: 1})

module.exports = mongoose.model("User", UserSchema)