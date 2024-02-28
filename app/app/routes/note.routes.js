const express = require("express");
const router = express.Router();

const note = require("../controllers/note.controller.js");

router.post("/", (req, res) => {
  try {
    const {
      note_title,
      note_content,
      note_status,
      note_creation_date,
      category_id,
      reminder_id,
    } = req.body;

    if (!note_title) {
      return res.status(400).send({ message: "note_title is required." });
    }

    const newNote = {
      note_title: note_title,
      note_content: note_content || "",
      note_status: note_status || "",
      note_creation_date:
        note_creation_date ||
        new Date(Date.now()).toISOString().split("T")[0],
      category_id: category_id || null,
      reminder_id: reminder_id || null,
    };

    note.create(newNote, (err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(201).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in saving note..!", error);
    return res.status(500).send({
      STATUS: "UNEXPECTED_ERROR",
      error: "Unexpected error in saving note, please try later..!",
    });
  }
});

// Retrieve all Note
router.get("/", (req, res) => {
  try {
    const title = req.query.note_title;
    note.getAll(title, (err, results) => {
      if (err) {
        if (err.kind === "not found") {
          return res.status(404).send({ error: "No notes found" });
        }
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in fetching notes..!", error);
    return res.status(500).send({
      STATUS: "UNEXPECTED_ERROR",
      error: "Unexpected error in fetching notes, please try later..!",
    });
  }
});

// Retrieve a single Note with id
router.get("/:id", (req, res) => {
  try {
    let id = req.params.id;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid or missing id parameter" });
    }

    note.findById(id, (err, results) => {
      if (err) {
        if (err.kind === "not found") {
          return res
            .status(404)
            .send({ error: "No notes found for the specified id" });
        }
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in getting note details by id..!", error);
    return res.status(500).send({
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

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid or missing id parameter" });
    }

    const {
      note_title,
      note_content,
      note_status,
      note_creation_date,
      category_id,
      reminder_id,
    } = req.body;

    if (!(note_title, note_content, note_status, note_creation_date)) {
      return res.status(400).send({ error: "All inputs are required" });
    }

    const upNote = {
      note_title: note_title,
      note_content: note_content,
      note_status: note_status,
      note_creation_date: note_creation_date,
      category_id: category_id || null,
      reminder_id: reminder_id || null,
    };

    note.updateById(id, upNote, (err, results) => {
      if (err) {
        if (err.kind === "not found") {
          return res
            .status(404)
            .send({ error: "No notes found for the specified id" });
        }
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log(
      "Unexpected error in updating Note details by noteId..!",
      error
    );
    return res.status(500).send({
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

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid or missing id parameter" });
    }

    note.remove(id, (err, results) => {
      if (err) {
        if (err.kind === "not found") {
          return res
            .status(404)
            .send({ error: "No notes found for the specified id" });
        }
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in deleting note details by id..!", error);
    return res.status(500).send({
      STATUS: "UNEXPECTED_ERROR",
      error:
        "Unexpected error in deleting note details by id, please try later..!",
    });
  }
});

// Delete all Notes
router.delete("/", (req, res) => {
  try {
    note.removeAll((err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in deleting all note..!", error);
    return res.status(500).send({
      STATUS: "UNEXPECTED_ERROR",
      error:
        "Unexpected error in deleting all note details, please try later..!",
    });
  }
});

module.exports = router;
