const express = require('express');
const router = express.Router();

const ordersCtrl = require("./orders.controller");

/**
 * API to save order details
 * EFFECTIVE URL: POST /api/v1/orders
 */
router.post("/", (req, res) => {
  try {
    let orderReq = {
      orderName: (req.body.orderName || ""),
      productId: (req.body.productId || ""),
      productName: (req.body.productName || ""),
      userId: (req.body.userId || ""),
      userName: (req.body.userName || ""),
      unitsPlaced: (req.body.unitsPlaced || 0),
      updatedBy: (req.body.updatedBy || "")
    }

    ordersCtrl.saveOrder(orderReq, (err, results) => {
      if (err) {
        // EXITING
        return res.status(400).send(err);
      }

      // EXITING
      return res.status(200).send({ STATUS: "OK", data: results });
    });

  } catch (error) {
    console.log("Unexpected error in saving order details..!", error);

    // EXITING
    return res.status(400).send({ STATUS: "UNEXPECTED_ERROR", error: "Unexpected error in saving order details, please try later..!" });
  }
});

module.exports = router;
