const express = require("express");
const router = express.Router();

const userController = require("./userController");

router.get("/", (req, res) => {
  try {
    const userData = req.claims;
    console.log(userData.claims);
    if (!userData.email) {
      return res.status(400).send("user email not available");
    }

    userController.findUser(userData.email, (err, result) => {
      if (err) {
        return res.status(400).send("error getting the user", err);
      } else {
        res.status(200).send(result);
      }
    });
  } catch (err) {
    console.error("Error getting the user:", err);
    res.status(500).send({ error: "Unexpected error, try after sometime" });
  }
});

module.exports = router;
