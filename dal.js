const mongoose = require('mongoose')
const Robot = require('./models/Robot')
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/robots3')

function getAllRobots() {
  return Robot.find()
}

function getRobotByName (name) {
  return Robot.find({ name: name }).catch(function (err) {
    console.log(err)
  })
}

function getJobRobots () {
  return Robot.find({ job:{$ne:null} }).catch(function (err) {
    console.log(err)
  })
}

function getAvailableRobots () {
  return Robot.find({ job:null}).catch(function (err) {
    console.log(err)
  })
}

function updateRobot(name, data) {
  return Robot.updateOne({"name": name},
    {"$set": {"job": data.job,
    "company": data.company,
    "address.city": data.city,
    "address.country": data.country,
    "email": data.email,
    "phone": data.phone,
    "university": data.university,
    "skills": data.skills}},
     function(err) {
      console.log("Error in update", err);
    });
}

function addPassword(name, password) {
  return Robot.updateOne({"name": name},
    {"$set": {"password": password}},
    function(err) {
      console.log("Error in add password ", err);
    });
}

function addRobot(newBot) {
  let newUser = new Robot(newBot);
  return newUser.save();
}

module.exports = {
  getAllRobots: getAllRobots,
  getRobotByName: getRobotByName,
  getJobRobots: getJobRobots,
  getAvailableRobots: getAvailableRobots,
  updateRobot: updateRobot,
  addPassword: addPassword,
  addRobot: addRobot
}
