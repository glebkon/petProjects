const express = require("express");
const router = express.Router();

const reminder = require("../controllers/reminder.controller.js");

// Create a new Reminder
router.post("/", (req, res) => {
  const {
    reminder_name,
    reminder_descr,
    reminder_type,
    reminder_creation_date,
  } = req.body;

  // Check if reminder_name is missing
  if (!reminder_name) {
    return res.status(400).send({ message: "reminder_name is required." });
  }

  try {
    const newReminder = {
      reminder_name: reminder_name,
      reminder_descr: reminder_descr || "",
      reminder_type: reminder_type || "",
      reminder_creation_date:
        reminder_creation_date ||
        new Date(Date.now()).toISOString().split("T")[0],
    };

    reminder.create(newReminder, (err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(201).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in saving reminder..!", error);
    return res.status(500).send({
      STATUS: "UNEXPECTED_ERROR",
      error: "Unexpected error in saving reminder, please try later..!",
    });
  }
});

// Retrieve all Reminder
router.get("/", (req, res) => {
  try {
    const name = req.query.name;
    reminder.getAll(name, (err, results) => {
      if (err) {
        if (err.kind === "not found") {
          return res.status(404).send({ error: "No reminders found" });
        }
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in fetching reminders..!", error);
    return res.status(500).send({
      STATUS: "UNEXPECTED_ERROR",
      error: "Unexpected error in fetching reminders, please try later..!",
    });
  }
});

// Retrieve a single Reminder with id
router.get("/:id", (req, res) => {
  try {
    let id = req.params.id;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid or missing id parameter" });
    }

    reminder.findById(id, (err, results) => {
      if (err) {
        if (err.kind === "not found") {
          return res
            .status(404)
            .send({ error: "No reminders found for the specified id" });
        }
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in getting reminder details by id..!", error);
    return res.status(500).send({
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

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid or missing id parameter" });
    }

    const {
      reminder_name,
      reminder_descr,
      reminder_type,
      reminder_creation_date,
    } = req.body;

    if (
      !(reminder_name, reminder_descr, reminder_type, reminder_creation_date)
    ) {
      return res.status(400).send({ error: "All inputs required" });
    }

    const upReminder = {
      reminder_name: reminder_name,
      reminder_descr: reminder_descr,
      reminder_type: reminder_type,
      reminder_creation_date: reminder_creation_date,
    };

    reminder.update(id, upReminder, (err, results) => {
      if (err) {
        if (err.kind === "not found") {
          return res
            .status(404)
            .send({ error: "No reminders found for the specified id" });
        }
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log(
      "Unexpected error in updating Reminder details by reminderId..!",
      error
    );
    return res.status(500).send({
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

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid or missing id parameter" });
    }

    reminder.remove(id, (err, results) => {
      if (err) {
        if (err.kind === "not found") {
          return res
            .status(404)
            .send({ error: "No reminders found for the specified id" });
        }
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log(
      "Unexpected error in deleting reminder details by id..!",
      error
    );
    return res.status(500).send({
      STATUS: "UNEXPECTED_ERROR",
      error:
        "Unexpected error in deleting reminder details by id, please try later..!",
    });
  }
});

// Delete all Reminders
router.delete("/", (req, res) => {
  try {
    reminder.removeAll((err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in deleting all reminder..!", error);
    return res.status(500).send({
      STATUS: "UNEXPECTED_ERROR",
      error:
        "Unexpected error in deleting all reminder details, please try later..!",
    });
  }
});

module.exports = router;
