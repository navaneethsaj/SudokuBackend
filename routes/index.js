var express = require("express");
var router = express.Router();

var userRouter = require("./users");
var gameRouter = require("./game");
var puzzleRouter = require("./puzzle");
var statsRouter = require("./stats");
var featuredRouter = require("./featured");

var startDate = new Date();

router.get("/", function (req, res) {
  res.send(`server is up and running since ${startDate} ...`);
});

router.use("/users", userRouter);
router.use("/game", gameRouter);
router.use("/puzzle", puzzleRouter);
router.use("/stats", statsRouter);
router.use("/featured", featuredRouter);

module.exports = router;
