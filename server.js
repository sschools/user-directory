const express = require("express");
const mustacheExpress = require("mustache-express");
const {getAllRobots, getRobotByName, getJobRobots, getAvailableRobots} = require("./dal");

const mongoose = require('mongoose')
const Robot = require('./models/Robot')

const app = express();

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.static("Public"));

app.get("/", function (request, respond) {
  respond.redirect("/index");
});

app.get("/index", (request, respond) => {
  getAllRobots().then(function (robots) {
    respond.render("index", {users:robots});
  });
});

app.get("/jobs", (request, respond) => {
  getJobRobots().then(function (robots) {
    respond.render("index", {users:robots});
  });
});

app.get("/nojobs", (request, respond) => {
  getAvailableRobots().then(function (robots) {
    respond.render("index", {users:robots});
  });
});

app.get("/index/:name", function (request, respond) {
  let name = request.params.name;
  getRobotByName(name).then(function (robot) {
    console.log(robot);
    respond.render("singleUser", robot[0]);
  })
})

app.listen(3000, function () {
  console.log("Successfully started user directory application on: 3000");
});
