const express = require("express");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const parseurl = require("parseurl");
const bodyParser = require("body-parser");
const {getAllRobots, getRobotByName, getJobRobots, getAvailableRobots, updateRobot, addPassword, addRobot} = require("./dal");
const mongoose = require('mongoose')
const Robot = require('./models/Robot')
const app = express();

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("Public"));
app.use(session({
  secret: "elvis",
  resave: false,
  saveUninitialized: true
}));

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
    respond.render("singleUser", robot[0]);
  });
});

app.get("/badPassword", function(req, res) {
  res.render("badPassword");
});

app.get("/addUser", function(req, res) {
  res.render("addUser");
});

app.post("/index/:name", function (req, res) {
  if (req.body.create) {
    let name = req.body.create;
    let p = req.body.password;
    addPassword(name, p);
    getRobotByName(name).then(function (robot) {
      let bot = robot[0];
      let message = "Password Saved";
      return res.render("edit", bot);
    });
  } else {
    let name = req.body.login;
    let p = req.body.password;
    getRobotByName(name).then(function (robot) {
      let bot = robot[0];
      if (bot.password !== p) {
        let message = "Password is incorrect";
        res.redirect("/badPassword");
      } else {
        return res.render("edit", bot);
      }
    });
  }
});

app.post("/edit", function(req, res) {
  let name=req.body.nameButton;
  updateRobot(name, req.body);
  res.redirect("/index");
});

app.post("/addUser", function(req, res) {
  addRobot(req.body);
  res.redirect("/index");
});

app.listen(3000, function () {
  console.log("Successfully started user directory application on: 3000");
});
