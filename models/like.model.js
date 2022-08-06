const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

const Like = mongoose.model("Like", {
  puzzleId: { type: Object, required: true },
  userId: { type: ObjectId, required: true },
});

module.exports = Like;
