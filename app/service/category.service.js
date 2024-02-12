const categoryDAO = require("../dao/category.dao");

/* Create and Save a new category by calling categoryDAO create method.
   Depending on the return value, it should return the results or the error message*/
exports.create = (newCategory, done) => {
  categoryDAO.create(newCategory, done);
};

/* Retrieve all categorys by calling categoryDAO getAll method.
    Depending on the return value, it should return the results or the error message*/
exports.getAll = (name, done) => {
  categoryDAO.getAll(name, done);
};

/* Find a single category by Id by calling categoryDAO findById method.
   Depending on the return value, it should return the results or the error message*/
exports.findById = (id, done) => {
  categoryDAO.findById(id, done);
};

/* Update a category identified by the id by calling categoryDAO updateById method.
   Depending on the return value, it should return the results or the error message*/
exports.updateById = (id, upCategory, done) => {
  categoryDAO.updateById(id, upCategory, done);
};

/* Delete a category with the specified id by calling categoryDAO remove method.
   Depending on the return value, it should return the results or the error message*/
exports.remove = (id, done) => {
  categoryDAO.remove(id, done);
};

/* Delete all categorys by calling categoryDAO removeAll method.
   Depending on the return value, it should return the results or the error message*/
exports.removeAll = (done) => {
  categoryDAO.removeAll(done);
};
