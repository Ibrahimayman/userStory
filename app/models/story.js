/**
 * Created by Ibrahim Ayman on 14/07/2017.
 */
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var StorySchema = new Schema({
    creator: {type: Schema.Types.ObjectId, ref: "User"},
    content: {type: String},
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Story", StorySchema);