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
    "phone": data.phone}},
     function(err) {
      console.log("Error in update", err);
    });
}

module.exports = {
  getAllRobots: getAllRobots,
  getRobotByName: getRobotByName,
  getJobRobots: getJobRobots,
  getAvailableRobots: getAvailableRobots,
  updateRobot: updateRobot
}
