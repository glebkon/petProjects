const ordersSerice = require("./orders.service");

const saveOrder = function (orderReq, done) {
  return ordersSerice.saveOrder(orderReq, done);
}

module.exports = {
  saveOrder
}