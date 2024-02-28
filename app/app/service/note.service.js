const noteDAO = require("../dao/note.dao");

exports.create = (newNote, done) => {
  noteDAO.create(newNote, (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

exports.getAll = (title, done) => {
  noteDAO.getAll(title, (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

exports.findById = (id, done) => {
  noteDAO.findById(id, (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

exports.updateById = (id, upNote, done) => {
  noteDAO.updateById(id, upNote, (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

exports.remove = (id, done) => {
  noteDAO.remove(id, (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

exports.removeAll = (done) => {
  noteDAO.removeAll((err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};
