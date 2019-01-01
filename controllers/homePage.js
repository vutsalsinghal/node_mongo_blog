const Post = require("../database/models/Post");

module.exports = async (req, res) => {
    const posts = await Post.find({publish:true}).populate("user_id");
    res.render("index", { posts });
};