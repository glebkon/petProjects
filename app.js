const express = require("express");
const cors = require("cors");
const app = express();
const categoryRouter = require("./app/routes/category.routes.js");
const noteRouter = require("./app/routes/note.routes.js");
const reminderRouter = require("./app/routes/reminder.routes.js");

var corsOptions = {
  origin: "http://localhost:8081",
};
// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

app.use(cors(corsOptions));

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Node.js with MySQL integration application.",
  });
});

app.use("/api/note", noteRouter);
app.use("/api/reminder", reminderRouter);
app.use("/api/category", categoryRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = server;
