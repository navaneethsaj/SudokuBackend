var express = require("express");
const {
  addFeatured,
  getFeatured,
  deleteFeatured,
} = require("../controllers/featured.controller");
var router = express.Router();

router.post("/add", addFeatured);
router.get("/get", getFeatured);
router.post("/delete", deleteFeatured);

module.exports = router;
