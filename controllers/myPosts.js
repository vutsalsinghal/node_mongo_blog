const Post = require("../database/models/Post");

module.exports = async (req, res) => {
    const posts = await Post.find({user_id:req.session.userId}).populate("user_id");
    res.render("myPosts", { posts });
};