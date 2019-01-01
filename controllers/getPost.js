const Post = require("../database/models/Post");

module.exports = async (req, res) => {
    let can_view = false;
    const post = await Post.findById(req.params.id).populate("user_id");
    if (req.session.userId == post.user_id._id){
        can_view = true;
    }

    console.log(post, can_view);
    res.render('post', { post, can_view });
}