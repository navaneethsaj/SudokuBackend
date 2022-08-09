const { ObjectId } = require("mongodb");
const Puzzle = require("../models/puzzle.model");
const Submission = require("../models/submission.model");
var uniqid = require("uniqid");

async function createPuzzle(req, res) {
  try {
    let { puzzle, user_id, difficulty } = req.body;
    console.log(req.body);
    let puzzle_instance = new Puzzle({
      puzzle,
      difficulty,
      nano_id: uniqid.time("#"),
    });
    await puzzle_instance.save();
    let submission_instance = new Submission({
      puzzleId: ObjectId(puzzle_instance._id),
      userId: ObjectId(user_id),
    });
    await submission_instance.save();
    res.status(200).send({ status: 200, puzzle_instance, submission_instance });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
}

async function getLatestPuzzle(req, res) {
  try {
    let puzzles = await Puzzle.find({
      createdOn: { $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) },
    })
      .sort({ lastPlayedOn: -1 })
      .limit(200);
    res.status(200).send({ status: 200, puzzles });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
}

async function updateSubmission(req, res) {
  try {
    let { puzzleId, userId, timeElapsed, solved } = req.body;
    console.log(
      { puzzleId, userId, timeElapsed, solved },
      ObjectId(puzzleId),
      ObjectId(userId)
    );
    let submission_instance = await Submission.findOneAndUpdate(
      { puzzleId: ObjectId(puzzleId), userId: ObjectId(userId) },
      { timeElapsed, solved, createdOn: new Date() }
    );
    let puzzle_instance = await Puzzle.findOneAndUpdate(
      { _id: ObjectId(puzzleId) },
      { lastPlayedOn: new Date() }
    );
    res.status(200).send({ status: 200, submission_instance, puzzle_instance });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
}

async function getSubmission(req, res) {
  try {
    console.log(req.params.puzzleId);
    let submission_instance = await Submission.find({
      puzzleId: ObjectId(req.params.puzzleId),
    });
    res.status(200).send({ status: 200, submission_instance });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
}

async function getWeeklyTrending(req, res) {
  try {
    let submission_instance = await Submission.aggregate([
      {
        $match: {
          createdOn: { $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: "$puzzleId",
          articleCount: { $sum: 1 },
        },
      },
      { $sort: { articleCount: -1 } },
      { $limit: 1 },
    ]);
    if (submission_instance.length < 1) {
      res.status(200).send({ status: 201, message: "No Trending" });
      return;
    }
    let puzzleId = submission_instance[0]._id;
    let puzzle_instance = await Puzzle.findById(puzzleId);
    res.status(200).send({ status: 200, submission_instance, puzzle_instance });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
}

async function createSubmission(req, res) {
  try {
    let { puzzleId, userId, timeElapsed = 0, solved = 0 } = req.body;
    let submission_instance = new Submission({
      puzzleId: ObjectId(puzzleId),
      userId: ObjectId(userId),
      solved,
      timeElapsed,
    });
    await submission_instance.save();
    res.status(200).send({ status: 200, submission_instance });
  } catch (error) {
    if (error.code === 11000) {
      res.status(200).send({ status: 200, message: "Already have submission" });
      return;
    }
    console.log(error.code, error);
    res.status(500).send("something went wrong");
  }
}

async function getMySubmissions(req, res) {
  try {
    let { id } = req.params;
    let submission_instance = await Submission.find({ userId: ObjectId(id) });
    res.status(200).send({ status: 200, submission_instance });
  } catch (error) {
    console.log(error.code, error);
    res.status(500).send("something went wrong");
  }
}

async function checkIfSubmitted(req, res) {
  try {
    let { userId, puzzleId } = req.params;
    let submission_instance = await Submission.find({
      userId: ObjectId(userId),
      puzzleId: ObjectId(puzzleId),
    });
    res.status(200).send({ status: 200, submission_instance });
  } catch (error) {
    console.log(error.code, error);
    res.status(500).send("something went wrong");
  }
}

module.exports = {
  createPuzzle,
  getLatestPuzzle,
  updateSubmission,
  getSubmission,
  getWeeklyTrending,
  createSubmission,
  getMySubmissions,
  checkIfSubmitted,
};
