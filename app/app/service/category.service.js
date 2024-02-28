const categoryDAO = require("../dao/category.dao");

exports.create = (newCategory, done) => {
  categoryDAO.create(newCategory, (err, result) => {
    if (err) {
      return done(err);
    }
    done(null, result);
  });
};

exports.findAll = (name, done) => {
  categoryDAO.findAll(name, (err, categories) => {
    if (err) {
      return done(err);
    }
    done(null, categories);
  });
};

exports.findById = (id, done) => {
  categoryDAO.findById(id, (err, category) => {
    if (err) {
      return done(err);
    }
    done(null, category);
  });
};

exports.updateById = (id, upCategory, done) => {
  categoryDAO.updateById(id, upCategory, (err, result) => {
    if (err) {
      return done(err);
    }
    done(null, result);
  });
};

exports.remove = (id, done) => {
  categoryDAO.remove(id, (err, result) => {
    if (err) {
      return done(err);
    }
    done(null, result);
  });
};

exports.removeAll = (done) => {
  categoryDAO.removeAll((err, result) => {
    if (err) {
      return done(err);
    }
    done(null, result);
  });
};
