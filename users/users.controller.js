const usersService = require("./users.service");
const ordersService = require("../orders/orders.service");

const saveUser = function (userReq, done) {
  return usersService.saveUser(userReq, done);
}

const findUsers = function (done) {
  return usersService.findUsers(done);
}

const getUserByEmail = function (email, done) {
  return usersService.getUserByEmail(email, done);
}

const findOrdersPlacedByUser = function (userId, done) {
  return ordersService.findOrdersPlacedByUser(userId, done);
}

module.exports = {
  saveUser,
  findUsers,
  getUserByEmail,
  findOrdersPlacedByUser
}