const { v4: uuidv4 } = require("uuid");
const ProductModel = require("./products.entity");

/* 
  saveProduct should be a function that calls the save() function on Products Model 
  to persist products data in MongoDB Products collection of shoppingcartDB
*/
const saveProduct = (productReq, done) => {
  const newProduct = new ProductModel(productReq);
  newProduct
    .save()
    .then((savedProduct) => done(undefined, savedProduct))
    .catch((err) => {
      console.error("Error saving product:", err);
      return done("Failed to save product due to data error!..");
    });
};

/* 
  getProductById should be a function that calls the findOne() function on Products Model 
  to fetch the Product document by provided Id from the Products collection of shoppingcartDB
*/
const getProductById = (id, done) => {
  ProductModel.findById(id)
    .select()
    .lean()
    .exec()
    .then((res) => done(undefined, res))
    .catch((err) => {
      console.log(
        "An error occurred while retrieving the product with the specified id: ",
        err
      );
      return done("Failed to fetch the product due to data error!..");
    });
};

/* 
  findProductsByQuery should be a function that calls the find() function on Products Model 
  with query specifying criteria on category and productName fields
  The function should fetch all documents that matches the criteria from Products 
  collection of shoppingcartDB
*/
const findProductsByQuery = (query, done) => {
  ProductModel.find(query)
    .lean()
    .exec()
    .then((res) => done(undefined, res))
    .catch((err) => {
      console.log("Error in fetching products: ", err);
      return done("Failed to fetch products due to data error!..");
    });
};

/* 
  updateProductDetails should be a function that calls the findOneAndUpdate() 
  function on Products Model that fetches product by id from Products collection of shoppingcartDB and updates it
*/
const updateProductDetails = (id, updateReq, done) => {
  ProductModel.findOneAndUpdate({ _id: id }, updateReq, { new: true })
    .then((res) => {
      if (res === null) {
        console.log("No matching product found to update");
        return done("No matching product found to update");
      }
      return done(undefined, res);
    })
    .catch((err) => {
      console.log("Error in updating product details ", err);
      done("Failed to update product due to data errors");
    });
};

module.exports = {
  saveProduct,
  getProductById,
  findProductsByQuery,
  updateProductDetails,
};
