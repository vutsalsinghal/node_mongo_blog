const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    content: String,
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    image: String
})

module.exports = new mongoose.model("Post", PostSchema);