const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  puzzleId: { type: Object, required: true },
  userId: { type: ObjectId, required: true },
  timeElapsed: { type: Number, required: true, default: 0 },
  createdOn: { type: Date, default: new Date() },
  solved: { type: Boolean, required: true, default: false },
});

SubmissionSchema.index({ puzzleId: 1, userId: 1 }, { unique: true });

const Submission = mongoose.model("Submission", SubmissionSchema);

try {
  Submission.syncIndexes();
} catch (error) {
  console.log("Index Build Failed Submission Model", error);
}

module.exports = Submission;
