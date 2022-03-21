const { ObjectId } = require('mongodb');
const User = require('../models/user.model');

async function getRandomUsers(req, res){
    try {
        let {myId} = req.body;
        let users = await User.aggregate([
            {$match: {
                _id: {$ne: ObjectId(myId)}
            }},
            {$sort: {
                lastSeen: -1
            }},
            {$limit: 30},
        ]).exec()
        res.send({status: 200, users})
    } catch (error) {
        console.log(error)
        res.status(500).send("something went wrong")
    }
}

async function createUser(req, res){
    try {
        let {name} = req.body
        console.log(name)
        let user = new User({
           name
        })
        await user.save()
        res.status(200).send({status: 200, user})
    } catch (error) {
        if (error.code === 11000){
            res.send({status: 201, message: 'duplicate user'})
        }else{
            console.log(error)
            res.status(500).send("something went wrong")
        }
    }
}


async function updateLastSeen(req, res){
    try {
        let {_id} = req.body
        await User.findByIdAndUpdate(ObjectId(_id), {lastSeen: new Date()}).exec();
        res.status(200).send({status: 200})
    } catch (error) {
        if (error.code === 11000){
            res.send({status: 201, message: 'duplicate user'})
        }else{
            console.log(error)
            res.status(500).send("something went wrong")
        }
    }
}

async function updateUserDetails(req, res){
    try {
        let {_id, score} = req.body
        await User.findByIdAndUpdate(ObjectId(_id), {score}).exec();
        res.status(200).send({status: 200})
    } catch (error) {
        if (error.code === 11000){
            res.send({status: 201, message: 'duplicate user'})
        }else{
            console.log(error)
            res.status(500).send("something went wrong")
        }
    }
}

async function getUserById(req, res){
    try {
        let {_id} = req.body
        let users = await User.findById(ObjectId(_id)).exec()
        res.send({status: 200, users})
    } catch (error) {
        console.log(error)
        res.status(500).send("something went wrong")
    }
}

async function getUserByIds(req, res){
    try {
        let {ids} = req.body
        for (let id of ids){
            id = ObjectId(id)
        }
        let users = await User.find({_id: {$in: ids}}).exec()
        res.send({status: 200, users})
    } catch (error) {
        console.log(error)
        res.status(500).send("something went wrong")
    }
}

async function getLeaderBoard(req, res){
    try {
        let users = await User.find().select({name: 1, score: 1, _id: 0}).sort({score: -1}).limit(200).exec()
        res.send({status: 200, users})
    } catch (error) {
        console.log(error)
        res.status(500).send("something went wrong")
    }
}

async function getMyRank(req, res){
    try {
        let {score} = req.body;
        let rank = await User.countDocuments({score: {$gt: score}}).exec()
        res.send({status: 200, rank})
    } catch (error) {
        console.log(error)
        res.status(500).send("something went wrong")
    }
}

module.exports = {
    getRandomUsers,
    createUser,
    getUserById,
    updateLastSeen,
    updateUserDetails,
    getUserByIds,
    getLeaderBoard,
    getMyRank
}