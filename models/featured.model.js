const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

const Featured = mongoose.model("Featured", {
  title: { type: String },
  description: { type: String },
  src: { type: String, required: true },
  action: { type: Object },
});

module.exports = Featured;
