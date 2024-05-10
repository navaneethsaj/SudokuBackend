const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

const Comment = mongoose.model("Comment", {
  puzzleId: { type: Object, required: true },
  userId: { type: ObjectId, required: true },
  createdOn: { type: Date, default: Date.now },
  text: { type: String, required: true },
});

module.exports = Comment;
