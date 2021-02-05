/**
 *  Creating the User schema
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdOnTime: {
        type: String,
        required: true
    }
})

const User = mongoose.model("user", UserSchema);


module.exports = User;