const { ObjectID } = require("bson");
const Featured = require("../models/featured.model");

async function addFeatured(req, res) {
  try {
    let { title, description, src, action, password } = req.body;
    if (password !== "admin123456") {
      res.status(300).send("UnAuthorized");
      return;
    }
    let featured = new Featured({
      title,
      description,
      src,
      action,
    });
    let response = await featured.save();
    res.send({ status: 200, response });
  } catch (error) {
    console.log(error);
    res.status(200).send("something went wrong");
  }
}

async function getFeatured(req, res) {
  try {
    let response = await Featured.find();
    res.send({ status: 200, response });
  } catch (error) {
    console.log(error);
    res.status(200).send("something went wrong");
  }
}

async function deleteFeatured(req, res) {
  try {
    let { id, password } = req.body;
    if (password !== "admin123456") {
      res.status(300).send("UnAuthorized");
      return;
    }
    let response = await Featured.findOneAndDelete({ _id: ObjectID(id) });
    res.send({ status: 200, response });
  } catch (error) {
    console.log(error);
    res.status(200).send("something went wrong");
  }
}
module.exports = {
  addFeatured,
  getFeatured,
  deleteFeatured,
};
