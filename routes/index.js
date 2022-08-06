var express = require("express");
var router = express.Router();

var userRouter = require("./users");
var gameRouter = require("./game");
var puzzleRouter = require("./puzzle");

var startDate = new Date();

router.get("/", function (req, res) {
  res.send(`server is up and running since ${startDate} ...`);
});

router.use("/users", userRouter);
router.use("/game", gameRouter);
router.use("/puzzle", puzzleRouter);

module.exports = router;
