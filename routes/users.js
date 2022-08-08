var express = require("express");
const {
  getRandomUsers,
  createUser,
  updateUserStatus,
  updateLastSeen,
  getUserById,
  getStatusById,
  updateUserDetails,
  getUserByIds,
  getLeaderBoard,
  getMyRank,
  getTopPlayer,
  getUserName,
} = require("../controllers/user.controller");
var router = express.Router();

router.post("/randomusers", getRandomUsers);
router.post("/createuser", createUser);
router.post("/updatelastseen", updateLastSeen);
router.post("/updateuserdetails", updateUserDetails);
router.post("/getuserbyid", getUserById);
router.post("/getuserbyids", getUserByIds);
router.post("/getleaderboard", getLeaderBoard);
router.post("/getmyrank", getMyRank);
router.get("/gettopplayer", getTopPlayer);
router.get("/getusername/:id", getUserName);

module.exports = router;
