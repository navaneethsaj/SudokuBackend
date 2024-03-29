const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

const Like = mongoose.model("Like", {
  puzzleId: { type: ObjectId, required: true },
  userId: { type: ObjectId, required: true },
});

module.exports = Like;
