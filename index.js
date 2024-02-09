var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get('/api', (req, res) => {
  let dt = new Date()
  res.json({unix: Date.parse(dt), utc: dt.toUTCString()})
})

app.get("/api/:date", (req, res) => {
  let dt =
    parseInt(req.params.date) == req.params.date
      ? new Date(parseInt(req.params.date))
      : new Date(req.params.date);
  if (isNaN(dt)) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: Date.parse(dt), utc: dt.toUTCString() });
  }
});

var listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
