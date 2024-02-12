const productsService = require("./products.service");

const saveProduct = function (productReq, done) {
  return productsService.saveProduct(productReq, done);
}

const getProductById = function (productId, done) {
  return productsService.getProductById(productId, done);
}

const findProductsByQuery = function (productsQuery, done) {
  return productsService.findProductsByQuery(productsQuery, done);
}

const updateProductDetails = function (productId, updateReq, done) {
  return productsService.updateProductDetails(productId, updateReq, done);
}

module.exports = {
  saveProduct,
  getProductById,
  findProductsByQuery,
  updateProductDetails
}