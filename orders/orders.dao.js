const { v4: uuidv4 } = require("uuid");
const OrderModel = require("./orders.entity");

/* 
  saveOrder should be a function that calls the save() function on Orders Model 
  to persist order data in MongoDB Orders collection of shoppingcartDB
*/
const saveOrder = (orderReq, done) => {
  const newOrder = new OrderModel(orderReq);

  newOrder
    .save()
    .then((savedOrder) => {
      console.log("Order saved:", savedOrder);
      return done(undefined, savedOrder);
    })
    .catch((err) => {
      console.error("Error saving order:", err);
      return done("Failed to save order due to data error!..");
    });
};

/* 
  findOrdersPlacedByUser should be a function that calls the find() function on Orders Model 
  to fetch all documents from Orders collection of shoppingcartDB,
  containing data of Orders for a given UserId
*/
const findOrdersPlacedByUser = (userId, done) => {};

module.exports = {
  saveOrder,
  findOrdersPlacedByUser,
};
