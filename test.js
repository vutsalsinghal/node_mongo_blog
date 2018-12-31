const mongoose = require("mongoose");

const Post = require("./database/models/Post");
mongoose.connect("mongodb://localhost/node_blog_test_connection");

Post.create({
    title: "sample title",
    description: "sample description",
    content: "sample content"
}, (error, post) => {
    console.log(error, post)
})