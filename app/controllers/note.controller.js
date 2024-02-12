const noteService = require("../service/note.service.js");

/* Call the create method of noteService object and return the result back*/
exports.create = (newNote, done) => {
  noteService.create(newNote, done);
};

/* Call the getAll method of noteService object and return the result back */
exports.findAll = (title, done) => {
  noteService.getAll(title, done);
};

/* Call the findById method of noteService object and return the result back */
exports.findOne = (id, done) => {
  noteService.findById(id, done);
};

/* Call the updateById method of noteService object and return the result back */
exports.update = (id, upNote, done) => {
  noteService.updateById(id, upNote, done);
};

/* Call the remove method of noteService object and return the result back */
exports.delete = (id, done) => {
  noteService.remove(id, done);
};

/* Call the removeAll method of noteService object and return the result back */
exports.deleteAll = (done) => {
  noteService.removeAll(done);
};
