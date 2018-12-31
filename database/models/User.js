const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
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