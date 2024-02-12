const categoryService = require("../service/category.service.js");

/* Call the create method of categoryService object and return the result back*/
exports.create = (newCategory, done) => {
  categoryService.create(newCategory, done);
};

/* Call the getAll method of categoryService object  and return the result back*/
exports.findAll = (name, done) => {
  categoryService.getAll(name, done);
};

/* Call the findById method of categoryService object  and return the result back*/
exports.findOne = (id, done) => {
  categoryService.findById(id, done);
};

/* Call the updateById method of categoryService object  and return the result back*/
exports.update = (id, upCategory, done) => {
  categoryService.updateById(id, upCategory, done);
};

/* Call the remove method of categoryService object  and return the result back*/
exports.delete = (id, done) => {
  categoryService.remove(id, done);
};

/* Call the removeAll method of categoryService object  and return the result back*/
exports.deleteAll = (done) => {
  categoryService.removeAll(done);
};