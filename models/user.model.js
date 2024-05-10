const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

const User = mongoose.model("User", {
  name: { type: String, required: true, unique: true },
  lastSeen: { type: Date, default: Date.now },
  createdOn: { type: Date, default: Date.now },
  score: { type: Number, default: 0 },
});

module.exports = User;
