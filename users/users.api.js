const express = require("express");
const router = express.Router();
const usersCtrl = require("./users.controller");

/**
 * API to save user details
 * EFFECTIVE URL: POST /api/v1/users
 */
router.post("/", (req, res) => {
  try {
    let userReq = {
      userName: req.body.userName || "",
      email: req.body.email || "",
      ordersPlaced: req.body.ordersPlaced || 0,
      tags: req.body.tags || [],
      description: req.body.description || "lol kek cheburek",
      updatedBy: req.body.updatedBy || "admin",
    };

    usersCtrl.saveUser(userReq, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in saving user..!", error);

    // EXITING
    return res
      .status(400)
      .send({
        STATUS: "UNEXPECTED_ERROR",
        error: "Unexpected error in saving user, please try later..!",
      });
  }
});

/**
 * API to get all users
 * EFFECTIVE URL: GET /api/v1/users/
 */
router.get("/", (req, res) => {
  try {
    usersCtrl.findUsers((err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in fetching users..!", error);

    // EXITING
    return res
      .status(400)
      .send({
        STATUS: "UNEXPECTED_ERROR",
        error: "Unexpected error in fetching users, please try later..!",
      });
  }
});

/**
 * API to get the users detail by email
 * EFFECTIVE URL: GET /api/v1/users/:email
 */
router.get("/:email", (req, res) => {
  try {
    let email = req.params.email;

    usersCtrl.getUserByEmail(email, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in getting user details by email..!", error);

    // EXITING
    return res
      .status(400)
      .send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in getting user details by email, please try later..!",
      });
  }
});

/**
 * API to get the details of orders placed by user
 * EFFECTIVE URL: GET /api/v1/users/:userId/orders
 */
router.get("/:userId/orders", (req, res) => {
  try {
    let userId = req.params.userId;

    usersCtrl.findOrdersPlacedByUser(userId, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log(
      "Unexpected error in getting details of orders placed by user..!",
      error
    );

    // EXITING
    return res
      .status(400)
      .send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in getting details of orders placed by user, please try later..!",
      });
  }
});

module.exports = router;
