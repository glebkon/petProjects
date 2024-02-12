const express = require('express');
const router = express.Router();
const productsCtrl = require("./products.controller");

/**
 * API to save product details
 * EFFECTIVE URL: POST /api/v1/products
 */
router.post("/", (req, res) => {
  try {
    let productReq = {
      productName: (req.body.productName || ""),
      description: (req.body.description || ""),
      price: (req.body.price || 0),
      unitsAvailable: (req.body.unitsAvailable || 0),
      tags: (req.body.tags || []),
      category: (req.body.category || ""),
      metadata: (req.body.metadata || {})
    }

    productsCtrl.saveProduct(productReq, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });

  } catch (error) {
    console.log("Unexpected error in saving product..!", error);

    // EXITING
    return res.status(400).send({ STATUS: "UNEXPECTED_ERROR", error: "Unexpected error in saving product, please try later..!" });
  }
});

/**
 * API to get products by query
 * EFFECTIVE URL: GET /api/v1/products
 */
router.get('/', (req, res) => {
  try {

    let productsQuery = {
      category: (req.query.category || ""),
      name: (req.query.name || "")
    }

    productsCtrl.findProductsByQuery(productsQuery, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in fetching products..!", error);

    // EXITING
    return res.status(400).send({ STATUS: "UNEXPECTED_ERROR", error: "Unexpected error in fetching products, please try later..!" });
  }
});

/**
 * API to get the product detail by productId
 * EFFECTIVE URL: GET /api/v1/products/:productId
 */
router.get('/:productId', (req, res) => {
  try {

    let productId = req.params.productId;

    productsCtrl.getProductById(productId, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in getting product details by productId..!", error);

    // EXITING
    return res.status(400).send({ STATUS: "UNEXPECTED_ERROR", error: "Unexpected error in getting product details by productId, please try later..!" });
  }
});

/**
 * API to update the product detail by productId
 * EFFECTIVE URL: PUT /api/v1/products/:productId
 */
router.put('/:productId', (req, res) => {
  try {

    let productId = req.params.productId;

    let updateReq = {
      productName: (req.body.productName || ""),
      description: (req.body.description || ""),
      price: (req.body.price || 0),
      unitsAvailable: (req.body.unitsAvailable || 0),
      tags: (req.body.tags || []),
      category: (req.body.category || ""),
      metadata: (req.body.metadata || {}),
      updatedOn: new Date()
    }

    productsCtrl.updateProductDetails(productId, updateReq, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in updating product details by productId..!", error);

    // EXITING
    return res.status(400).send({ STATUS: "UNEXPECTED_ERROR", error: "Unexpected error in updating product details by productId, please try later..!" });
  }
});


module.exports = router;

