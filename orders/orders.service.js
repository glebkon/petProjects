const async = require("async");

const ordersDAO = require("./orders.dao");
const productsService = require("../products/products.service");
const usersService = require("../users/users.service");

const placeOrderOfProduct = function (orderReq, product, cb) {
  //console.log("Hello from placeOrderOfProduct: ", orderReq, product)
  if (product.unitsAvailable < 1) {
    // EXITING
    return cb("No units available to place order, please try later..!")
  }

  ordersDAO.saveOrder(orderReq, (err, savedOrder) => {
    const availableUnits = product.unitsAvailable - savedOrder.unitsPlaced;
    console.log("Available units of product after placing order::", availableUnits);

    // EXITING with results
    return cb(null, savedOrder.productId, { "unitsAvailable": availableUnits });
  });
}

const updateOrdersPlacedByUser = function (orderReq, updatedProduct, cb) {
  usersService.getUserById(orderReq.userId, (err, user) => {
    if (err) {
      // EXITING
      return cb(err);
    }

    const ordersPlaced = user.ordersPlaced + orderReq.unitsPlaced;
    console.log("Total orders places by user::", ordersPlaced);

    return cb(null, orderReq.userId, { "ordersPlaced": ordersPlaced });
  });
}

const saveOrder = function (orderReq, done) {
  /**
   * Saving the order details
   * Decreasing the available units of product wrt number of orders placed
   * Increased number of orders placed by user
   */
  async.waterfall([
    async.apply(productsService.getProductById, orderReq.productId),
    async.apply(placeOrderOfProduct, orderReq),
    async.apply(productsService.updateProductDetails),
    async.apply(updateOrdersPlacedByUser, orderReq),
    async.apply(usersService.updateUserDetails)
  ], (err, result) => {
    if (err) {
      // EXITING
      return done({ "STATUS": "DATA_ERROR", "error": err });
    }

    return done(null, "Successfully placed order..!");
  });
}

const findOrdersPlacedByUser = function (userId, done) {
  ordersDAO.findOrdersPlacedByUser(userId, (err, results) => {
    if (err) {
      // EXITING
      return done({ "STATUS": "DATA_ERROR", "error": "Encountered data error in getting orders placed by user..!" });
    }

    // EXITING with results
    return done(null, results);
  });
}

module.exports = {
  saveOrder,
  findOrdersPlacedByUser
}