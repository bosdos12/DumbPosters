/**
 *  CREATING THE POST SCHEMA
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PostSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    PostedOnTime: {
        type: String,
        required: true
    }
})

const Post = mongoose.model("post", PostSchema);


module.exports = Post;




