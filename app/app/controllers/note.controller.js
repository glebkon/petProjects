const noteService = require("../service/note.service.js");

exports.create = (newNote, done) => {
  noteService.create(newNote, (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

exports.getAll = (title, done) => {
  noteService.getAll(title, (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

exports.findById = (id, done) => {
  noteService.findById(id, (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

exports.updateById = (id, upNote, done) => {
  noteService.updateById(id, upNote, (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

exports.remove = (id, done) => {
  noteService.remove(id, (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

exports.removeAll = (done) => {
  noteService.removeAll((err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

