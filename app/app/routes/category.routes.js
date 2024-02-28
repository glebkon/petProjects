const express = require("express");
const router = express.Router();

const category = require("../controllers/category.controller.js");

// Create a new Category
router.post("/", (req, res) => {
  try {
    const { category_name, category_descr, category_creation_date } = req.body;

    if (!category_name) {
      return res.status(400).send({ message: "category_name is required." });
    }
    const newCategory = {
      category_name: category_name,
      category_descr: category_descr || "",
      category_creation_date:
        category_creation_date ||
        new Date(Date.now()).toISOString().split("T")[0],
    };

    category.create(newCategory, (err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(201).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in saving category..!", error);
    return res.status(500).send({
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
        if (err.kind === "not found") {
          return res
            .status(404)
            .send({ error: "No categories found" });
        }
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in fetching categories..!", error);
    return res.status(500).send({
      STATUS: "UNEXPECTED_ERROR",
      error: "Unexpected error in fetching categories, please try later..!",
    });
  }
});

// Retrieve a single Category with id
router.get("/:id", (req, res) => {
  try {
    let id = req.params.id;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid or missing id parameter" });
    }

    category.findById(id, (err, results) => {
      if (err) {
        if (err.kind === "not found") {
          return res
            .status(404)
            .send({ error: "No categories found for the specified id" });
        }
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in getting category details by id..!", error);
    return res.status(500).send({
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

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid or missing id parameter" });
    }

    const { category_name, category_descr, category_creation_date } = req.body;

    if (!(category_name, category_descr, category_creation_date)) {
      return res.status(400).send({ message: "All inputs are required." });
    }

    const upCategory = {
      category_name: category_name,
      category_descr: category_descr,
      category_creation_date: category_creation_date,
    };

    category.updateById(id, upCategory, (err, results) => {
      if (err) {
        if (err.kind === "not found") {
          return res
            .status(404)
            .send({ error: "No categories found for the specified id" });
        }
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log(
      "Unexpected error in updating Category details by categoryId..!",
      error
    );
    return res.status(500).send({
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

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid or missing id parameter" });
    }

    category.remove(id, (err, results) => {
      if (err) {
        if (err.kind === "not found") {
          return res
            .status(404)
            .send({ error: "No categories found for the specified id" });
        }
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log(
      "Unexpected error in deleting category details by id..!",
      error
    );
    return res.status(500).send({
      STATUS: "UNEXPECTED_ERROR",
      error:
        "Unexpected error in deleting category details by id, please try later..!",
    });
  }
});

// Delete all category
router.delete("/", (req, res) => {
  try {
    category.removeAll((err, results) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in deleting all categories..!", error);
    return res.status(500).send({
      STATUS: "UNEXPECTED_ERROR",
      error:
        "Unexpected error in deleting all category details, please try later..!",
    });
  }
});

module.exports = router;
