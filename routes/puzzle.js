var express = require("express");
const {
  createPuzzle,
  getLatestPuzzle,
  updateSubmission,
  getSubmission,
  getWeeklyTrending,
  createSubmission,
} = require("../controllers/puzzle.controller");
var router = express.Router();

router.post("/create", createPuzzle);
router.get("/getlatest", getLatestPuzzle);
router.post("/createsubmission", createSubmission);
router.post("/updatesubmission", updateSubmission);
router.get("/getsubmission/:puzzleId", getSubmission);
router.get("/getweeklytrending", getWeeklyTrending);

module.exports = router;
