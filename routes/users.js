var express = require('express');
const { getRandomUsers, createUser, updateUserStatus, updateLastSeen, getUserById, getStatusById, updateUserDetails, getUserByIds, getLeaderBoard, getMyRank } = require('../controllers/user.controller');
var router = express.Router();

router.post('/randomusers', getRandomUsers);
router.post('/createuser', createUser);
router.post('/updatelastseen', updateLastSeen);
router.post('/updateuserdetails', updateUserDetails);
router.post('/getuserbyid', getUserById);
router.post('/getuserbyids', getUserByIds);
router.post('/getleaderboard', getLeaderBoard);
router.post('/getmyrank', getMyRank);

module.exports = router;
