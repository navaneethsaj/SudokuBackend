var express = require("express");
const {
  successRatio,
  allPlayerSuccessRatio,
  myBeatingRatio,
  timeStats,
  puzzleStats,
  countUsers,
} = require("../controllers/stats.controller");
var router = express.Router();

router.get("/successratio/:id", successRatio);
router.get("/allplayersuccessratio", allPlayerSuccessRatio);
router.get("/mybeatstatus/:score", myBeatingRatio);
router.get("/time/:id", timeStats);
router.get("/puzzle/:id", puzzleStats);
router.get("/usercount", countUsers);

module.exports = router;
