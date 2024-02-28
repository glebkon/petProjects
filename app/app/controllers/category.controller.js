const categoryService = require("../service/category.service.js");

exports.create = (newCategory, done) => {
  categoryService.create(newCategory, (err, result) => {
    if (err) {
      return done(err);
    }
    done(null, result);
  });
};

exports.findAll = (name, done) => {
  categoryService.findAll(name, (err, categories) => {
    if (err) {
      return done(err);
    }
    done(null, categories);
  });
};

exports.findById = (id, done) => {
  categoryService.findById(id, (err, category) => {
    if (err) {
      return done(err);
    }
    done(null, category);
  });
};

exports.updateById = (id, upCategory, done) => {
  categoryService.updateById(id, upCategory, (err, result) => {
    if (err) {
      return done(err);
    }
    done(null, result);
  });
};

exports.remove = (id, done) => {
  categoryService.remove(id, (err, result) => {
    if (err) {
      return done(err);
    }
    done(null, result);
  });
};

exports.removeAll = (done) => {
  categoryService.removeAll((err, result) => {
    if (err) {
      return done(err);
    }
    done(null, result);
  });
};