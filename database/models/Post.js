const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    content: String,
    username: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    image: String
})

module.exports = new mongoose.model("Post", PostSchema);