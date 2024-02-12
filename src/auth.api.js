const express = require("express");
const config = require("../config");
const router = express.Router();
const oauthCtrl = require("./auth.controller");

// redirects the login to consent authorization screen from github
router.get("/login", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${config.CLIENT_ID}`
  );
});

// Callback url to which github oauth code is sent
router.get("/callback", (req, res) => {
  // Return the token in cookie
  // Data should be sent either in cookie or in session storage
  try {
    const code = req.query.code;

    // Check if the 'code' parameter is missing
    if (!code) {
      res
        .status(401)
        .send({
          error: "Unauthorized",
          details: "'code' parameter is missing",
        });
      return;
    }
    oauthCtrl.oauthProcessor(code, (err, data) => {
      if (err) {
        console.error("OAuth Processor Error:", err);
        res.status(401).send({ error: "Bad request", details: err.message });
      } else {
        res.redirect(`/?token=${data}`);
      }
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
