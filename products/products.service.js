const productsDAO = require("./products.dao");

const saveProduct = function (productReq, done) {
  productsDAO.saveProduct(productReq, (err, results) => {
    if (err) {
      // EXITING
      return done({ "STATUS": "DATA_ERROR", "error": "Encountered data error in saving product..!" });
    }

    // EXITING with results
    return done(null, results);
  });
}

const getProductById = function (productId, done) {
  productsDAO.getProductById(productId, (err, results) => {
    if (err) {
      // EXITING
      return done({ "STATUS": "DATA_ERROR", "error": "Encountered data error in getting product details..!" });
    }

    // EXITING with results
    return done(null, results);
  });
}

const findProductsByQuery = function (productsQuery, done) {
  productsDAO.findProductsByQuery(productsQuery, (err, results) => {
    if (err) {
      // EXITING
      return done({ "STATUS": "DATA_ERROR", "error": "Encountered data error in finding products..!" });
    }

    // EXITING with results
    return done(null, results);
  });
}

const updateProductDetails = function (productId, updateReq, done) {
  productsDAO.updateProductDetails(productId, updateReq, (err, results) => {
    if (err) {
      // EXITING
      return done({ "STATUS": "DATA_ERROR", "error": "Encountered data error in updating product details..!" });
    }

    // EXITING with results
    return done(null, results);
  });
}

module.exports = {
  saveProduct,
  getProductById,
  findProductsByQuery,
  updateProductDetails
}