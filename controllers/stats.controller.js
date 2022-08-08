const { ObjectId } = require("mongodb");
const Puzzle = require("../models/puzzle.model");
const Submission = require("../models/submission.model");
const User = require("../models/user.model");

async function successRatio(req, res) {
  try {
    let { id } = req.params;
    let submission_instance = await Submission.aggregate([
      {
        $match: {
          userId: ObjectId(id),
        },
      },
      {
        $group: {
          _id: "$solved",
          articleCount: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send({ status: 200, submission_instance });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
}

async function allPlayerSuccessRatio(req, res) {
  try {
    let submission_instance = await Submission.aggregate([
      {
        $group: {
          _id: "$solved",
          articleCount: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send({ status: 200, submission_instance });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
}

async function myBeatingRatio(req, res) {
  try {
    let { score } = req.params;
    let user_instance = await User.countDocuments({ score: { $gt: score } });
    let total_instance = await User.countDocuments();
    res.status(200).send({ status: 200, user_instance, total_instance });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
}

async function timeStats(req, res) {
  try {
    let { id } = req.params;
    let submission_instance = await Submission.aggregate([
      { $match: { userId: ObjectId(id) } },
      {
        $group: {
          _id: "$userId",
          average: { $avg: "$timeElapsed" },
          sum: { $sum: "$timeElapsed" },
        },
      },
    ]);
    res.status(200).send({ status: 200, submission_instance });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
}

async function puzzleStats(req, res) {
  try {
    let { id } = req.params;
    console.log(id);
    let solution_instance = await Submission.aggregate([
      {
        $match: {
          puzzleId: ObjectId(id),
        },
      },
      {
        $group: {
          _id: "$solved",
          articleCount: { $sum: 1 },
        },
      },
    ]);
    let time_instance = await Submission.aggregate([
      { $match: { puzzleId: ObjectId(id) } },
      {
        $group: {
          _id: "$puzzleId",
          average: { $avg: "$timeElapsed" },
          sum: { $sum: "$timeElapsed" },
        },
      },
    ]);
    res.status(200).send({ status: 200, solution_instance, time_instance });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
}

async function countUsers(req, res) {
  try {
    let users = await User.countDocuments({});
    res.status(200).send({ status: 200, users });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
}

module.exports = {
  successRatio,
  allPlayerSuccessRatio,
  myBeatingRatio,
  timeStats,
  puzzleStats,
  countUsers,
};
