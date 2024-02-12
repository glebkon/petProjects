const reminderDAO = require("../dao/reminder.dao");

/* Create and Save a new Reminder by calling reminderDAO create method.
   Depending on the return value, it should return the results or the error message*/
exports.create = (newReminder, done) => {
  reminderDAO.create(newReminder, done);
};

/* Retrieve all reminders by calling reminderDAO getAll method.
    Depending on the return value, it should return the results or the error message*/
exports.getAll = (name, done) => {
  reminderDAO.getAll(name, done);
};

/* Find a single Reminder by Id by calling reminderDAO findById method.
   Depending on the return value, it should return the results or the error message*/
exports.findById = (id, done) => {
  reminderDAO.findById(id, done);
};

/* Update a Reminder identified by the id by calling reminderDAO updateById method.
   Depending on the return value, it should return the results or the error message*/
exports.updateById = (id, upReminder, done) => {
  reminderDAO.updateById(id, upReminder, done);
};

/* Delete a Reminder with the specified id by calling reminderDAO remove method.
   Depending on the return value, it should return the results or the error message*/
exports.remove = (id, done) => {
  reminderDAO.remove(id, done);
};

/* Delete all Reminders by calling reminderDAO removeAll method.
   Depending on the return value, it should return the results or the error message*/
exports.removeAll = (done) => {
  reminderDAO.removeAll(done);
};
