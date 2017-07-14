/*  Created by Ibrahim Ayman on 12/07/2017. */

var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require("bcrypt-nodejs"),
    crypto = require("crypto");

var UserSchema = new Schema({
    name: String,
    username: {type: String, required: true, index: {unique: true}}, // unique for no duplication
    password: {type: String, required: true, select: true},
});

// hash password before saving user to DB.
UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified("password")) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, null, (e, hash) => {
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});


UserSchema.methods.comparePassword = (password) => {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};


module.exports = mongoose.model("user", UserSchema);