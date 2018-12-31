const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide your username"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide your email"],
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
    }
});

UserSchema.pre("save", function (next) {
    const user = this;
    bcrypt.hash(this.password, 10, function (err, encrypted) {
        user.password = encrypted;
        next();
    });
});

module.exports = new mongoose.model("User", UserSchema);