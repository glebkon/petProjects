const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

const User = require("./models/user.js");
const Exercise = require("./models/exercise.js");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

mongoose.connect("mongodb://localhost:27017/exercisetracker");

app.post("/api/users", (req, res) => {
  let user = new User({
    username: req.body.username,
  });
  user
    .save()
    .then((data) => {
      if (!data) res.send("Username already taken");
      console.log(data);
      res.json({ username: data.username, _id: data._id });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/api/users", (req, res) => {
  User.find({})
    .then((data) => res.send(data))
    .catch((err) => {
      console.log(err);
      res.send("No users");
    });
});

app.post("/api/users/:_id/exercises", async (req, res) => {
  const data = await User.findById({ _id: req.params._id });
  if (!data) res.send("Unknown userId");
  else {
    let { username, _id } = data;
    let { description, duration, date } = req.body;
    let exercise = new Exercise({
      _userId: _id,
      description: description,
      duration: +duration,
      date: date === "" ? new Date() : date,
    });
    const result = await exercise.save();
    res.json({
      _id,
      username,
      description,
      duration: result.duration,
      date: new Date(result.date).toDateString(),
    });
  }
});

app.get("/api/users/:_id/logs", async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const exercisesQuery = Exercise.find({ _userId: req.params._id });

    if (req.query.from) {
      exercisesQuery.where("date").gte(new Date(req.query.from));
    }
    if (req.query.to) {
      exercisesQuery.where("date").lte(new Date(req.query.to));
    }
    if (req.query.limit) {
      exercisesQuery.limit(parseInt(req.query.limit));
    }

    let exercises = await exercisesQuery.exec();

    const logs = exercises.map((exercise) => ({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
    }));

    const logCount = exercises.length;

    const response = {
      username: user.username,
      _id: user._id,
      log: logs,
      count: logCount,
    };

    res.json(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
