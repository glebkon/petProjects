const express = require("express");
const router = express.Router();

const note = require("../controllers/note.controller.js");

router.post("/", (req, res) => {
  try {
    const newNote = {
      note_title: req.body.note_title || "",
      note_content: req.body.note_content || "",
      note_status: req.body.note_status || "",
      note_creation_date: req.body.note_creation_date || "",
      category_id: req.body.category_id,
      reminder_id: req.body.reminder_id,
    };

    note.create(newNote, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(201).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in saving note..!", error);

    // EXITING
    return res
      .status(400)
      .send({
        STATUS: "UNEXPECTED_ERROR",
        error: "Unexpected error in saving note, please try later..!",
      });
  }
});

// Retrieve all Note
router.get("/", (req, res) => {
  try {
    const title = req.query.note_title; // title???
    note.findAll(title, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in fetching notes..!", error);

    // EXITING
    return res
      .status(400)
      .send({
        STATUS: "UNEXPECTED_ERROR",
        error: "Unexpected error in fetching notes, please try later..!",
      });
  }
});

// Retrieve a single Note with id
router.get("/:id", (req, res) => {
  try {
    let id = req.params.id;

    note.findOne(id, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in getting note details by id..!", error);

    // EXITING
    return res
      .status(400)
      .send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in getting note details by id, please try later..!",
      });
  }
});

// Update a Note with id
router.put("/:id", (req, res) => {
  try {
    let id = req.params.id;

    const upNote = {
      note_title: req.body.note_title || "",
      note_content: req.body.note_content || "",
      note_status: req.body.note_status || "",
      note_creation_date: req.body.note_creation_date || "",
      category_id: req.body.category_id,
      reminder_id: req.body.reminder_id,
    };

    note.update(id, upNote, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log(
      "Unexpected error in updating Note details by noteId..!",
      error
    );

    // EXITING
    return res
      .status(400)
      .send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in updating note details by noteId, please try later..!",
      });
  }
});

// Delete a Note with id
router.delete("/:id", (req, res) => {
  try {
    let id = req.params.id;

    note.delete(id, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in deleting note details by id..!", error);

    // EXITING
    return res
      .status(400)
      .send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in deleting note details by id, please try later..!",
      });
  }
});

// Delete all Notes
router.delete("/", (req, res) => {
  try {
    note.deleteAll((err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in deleting all note..!", error);

    // EXITING
    return res
      .status(400)
      .send({
        STATUS: "UNEXPECTED_ERROR",
        error:
          "Unexpected error in deleting all note details, please try later..!",
      });
  }
});

module.exports = router;
