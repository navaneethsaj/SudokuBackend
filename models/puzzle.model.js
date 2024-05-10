const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

const Puzzle = mongoose.model("Puzzle", {
  nano_id: { type: String, required: true },
  puzzle: { type: Object, required: true },
  difficulty: { type: Number, default: 1 },
  createdOn: { type: Date, default: Date.now },
  lastPlayedOn: { type: Date, default: Date.now },
});

module.exports = Puzzle;
