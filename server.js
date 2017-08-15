const express = require("express");
const app = express();

const mustacheExpress = require("mustache-express");

const data = require("./data");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.static("Public"));

app.get("/", function (request, respond) {
  respond.send(data);
});

app.get("/index", function (request, respond) {
  respond.render("index", {users:data.users});
});

app.get("/index/:name", function (request, respond) {
  let chosenUser = {};
  for (let i = 0; i < data.users.length; i++) {
    if (data.users[i].name === request.params.name) {
      chosenUser = data.users[i];
    }
  }
  respond.render("singleUser", chosenUser);
})

app.listen(3000, function () {
  console.log("Successfully started express application.");
});
