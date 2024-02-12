const express = require("express");
const router = express.Router();

const reminder = require("../controllers/reminder.controller.js");

// Create a new Reminder
router.post("/", (req, res) => {
  try {
    const newReminder = {
      reminder_name: req.body.reminder_name || "",
      reminder_descr: req.body.reminder_descr || "",
      reminder_type: req.body.reminder_type || "",
      reminder_creation_date: req.body.reminder_creation_date || "",
    };

    reminder.create(newReminder, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in saving reminder..!", error);

    // EXITING
    return res
      .status(400)
      .send({
        STATUS: "UNEXPECTED_ERROR",
        error: "Unexpected error in saving reminder, please try later..!",
      });
  }
});

// Retrieve all Reminder
router.get("/", (req, res) => {
  try {
    const name = req.query.name;
    reminder.findAll(name, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in fetching reminders..!", error);

    // EXITING
    return res
      .status(400)
      .send({
        STATUS: "UNEXPECTED_ERROR",
        error: "Unexpected error in fetching reminders, please try later..!",
      });
  }
});

// Retrieve a single Reminder with id
router.get("/:id", (req, res) => {
  try {
    let id = req.params.id;

    reminder.findOne(id, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in getting reminder details by id..!", error);

    // EXITING
    return res
      .status(400)
      .send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in getting reminder details by id, please try later..!",
      });
  }
});

// Update a Reminder with id
router.put("/:id", (req, res) => {
  try {
    let id = req.params.id;

    const upReminder = {
      reminder_name: req.body.reminder_name || "",
      reminder_descr: req.body.reminder_descr || "",
      reminder_type: req.body.reminder_type || "",
      reminder_creation_date: req.body.reminder_creation_date || "",
    };

    reminder.update(id, upReminder, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log(
      "Unexpected error in updating Reminder details by reminderId..!",
      error
    );

    // EXITING
    return res
      .status(400)
      .send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in updating reminder details by reminderId, please try later..!",
      });
  }
});

// Delete a Reminder with id
router.delete("/:id", (req, res) => {
  try {
    let id = req.params.id;

    reminder.delete(id, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log(
      "Unexpected error in deleting reminder details by id..!",
      error
    );

    // EXITING
    return res
      .status(400)
      .send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in deleting reminder details by id, please try later..!",
      });
  }
});

// Delete all Reminders
router.delete("/", (req, res) => {
  try {
    reminder.deleteAll((err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in deleting all reminder..!", error);

    // EXITING
    return res
      .status(400)
      .send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in deleting all reminder details, please try later..!",
      });
  }
});

module.exports = router;
