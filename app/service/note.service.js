const noteDAO = require("../dao/note.dao");

exports.create = (newNote, done) => {
  noteDAO.create(newNote, done);
};

exports.getAll = (title, done) => {
  noteDAO.getAll(title, done);
};

exports.findById = (id, done) => {
  noteDAO.findById(id, done);
};

exports.updateById = (id, upNote, done) => {
  noteDAO.updateById(id, upNote, done);
};

exports.remove = (id, done) => {
  noteDAO.remove(id, done);
};

exports.removeAll = (done) => {
  noteDAO.removeAll(done);
};
