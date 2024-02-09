require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const dns = require("dns");
const urlparser = require("url");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/urlshortener");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

const urlSchema = new mongoose.Schema({
  url: String,
});

const URL = mongoose.model("URL", urlSchema);

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

app.post("/api/shorturl", (req, res) => {
  dns.lookup(urlparser.parse(req.body.url).hostname, (error, address) => {
    if (!address) {
      res.json({ error: "invalid url" });
    } else {
      let url = new URL({ url: `${req.body.url}` });
      url
        .save()
        .then((doc) => {
          console.log(doc);
          res.json({ original_url: req.body.url, short_url: doc._id });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
});

app.get("/api/shorturl/:id", function (req, res) {
  URL.findById({ _id: req.params.id })
    .then((data) => res.redirect(data.url))
    .catch((err) => {
      console.log(err);
      res.json({ error: "invalid url" });
    });
});
