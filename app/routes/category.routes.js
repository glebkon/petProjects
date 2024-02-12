const express = require("express");
const router = express.Router();

const category = require("../controllers/category.controller.js");

// Create a new Category
router.post("/", (req, res) => {
  try {
    const newCategory = {
      category_name: req.body.category_name || "",
      category_descr: req.body.category_descr || "",
      category_creation_date: req.body.category_creation_date || "",
    };

    category.create(newCategory, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in saving category..!", error);

    // EXITING
    return res.status(400).send({
      STATUS: "UNEXPECTED_ERROR",
      error: "Unexpected error in saving category, please try later..!",
    });
  }
});

// Retrieve all category
router.get("/", (req, res) => {
  try {
    const name = req.query.name;
    category.findAll(name, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in fetching categories..!", error);

    // EXITING
    return res.status(400).send({
      STATUS: "UNEXPECTED_ERROR",
      error: "Unexpected error in fetching categories, please try later..!",
    });
  }
});

// Retrieve a single Category with id
router.get("/:id", (req, res) => {
  try {
    let id = req.params.id;
    category.findOne(id, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in getting category details by id..!", error);

    // EXITING
    return res.status(400).send({
      STATUS: "UNEXPECTED_ERROR",
      error:
        "Unexpected error in getting category details by id, please try later..!",
    });
  }
});

// Update a Category with id
router.put("/:id", (req, res) => {
  try {
    let id = req.params.id;
    const upCategory = {
      category_name: req.body.category_name,
      category_descr: req.body.category_descr || "",
      category_creation_date: req.body.category_creation_date || "",
    };

    category.update(id, upCategory, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log(
      "Unexpected error in updating Category details by categoryId..!",
      error
    );

    // EXITING
    return res.status(400).send({
      STATUS: "UNEXPECTED_ERROR",
      error:
        "Unexpected error in updating category details by categoryId, please try later..!",
    });
  }
});

// Delete a Category with id
router.delete("/:id", (req, res) => {
  try {
    let id = req.params.id;
    category.delete(id, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log(
      "Unexpected error in deleting category details by id..!",
      error
    );

    // EXITING
    return res.status(400).send({
      STATUS: "UNEXPECTED_ERROR",
      error:
        "Unexpected error in deleting category details by id, please try later..!",
    });
  }
});

// Delete all category
router.delete("/", (req, res) => {
  try {
    category.deleteAll((err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in deleting all categories..!", error);

    // EXITING
    return res.status(400).send({
      STATUS: "UNEXPECTED_ERROR",
      error:
        "Unexpected error in deleting all category details, please try later..!",
    });
  }
});

module.exports = router;
