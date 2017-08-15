const express = require("express");
const app = express();

const mustacheExpress = require("mustache-express");

const data = require("./data");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.static("public"));

app.get("/", function (request, respond) {
  respond.send(data);
});

app.get("/index", function (request, respond) {
  respond.render("index", {users:data.users});
});

app.listen(3000, function () {
  console.log("Successfully started express application.");
});
