var express = require('express');
var router = express.Router();

var userRouter = require('./users')

var startDate = new Date()

router.get('/', function(req, res) {
  res.send(`server is up and running since ${startDate} ...`);
});

router.use('/users', userRouter)

module.exports = router;
