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
  getAllRobots().then(function(robots) {
    let bots= robots;
    for (let i = 0; i < bots.length; i++) {
      if (bots[i].name === name) {
        console.log(bots[i]);
      }
    }
  });

}

module.exports = {
  getAllRobots: getAllRobots,
  getRobotByName: getRobotByName,
  getJobRobots: getJobRobots,
  getAvailableRobots: getAvailableRobots,
  updateRobot: updateRobot
}
