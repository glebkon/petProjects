const reminderService = require("../service/reminder.service.js");

/* Call the create method of reminderService object and return the result back*/
exports.create = (newReminder, done) => {
  reminderService.create(newReminder, done);
};

/* Call the getAll method of reminderService object  and return the result back*/
exports.findAll = (name, done) => {
  reminderService.getAll(name, done);
};

/* Call the findById method of reminderService object  and return the result back*/
exports.findOne = (id, done) => {
  reminderService.findById(id, done);
};

/* Call the updateById method of reminderService object  and return the result back*/
exports.update = (id, upReminder, done) => {
  reminderService.updateById(id, upReminder, done);
};

/* Call the remove method of reminderService object  and return the result back*/
exports.delete = (id, done) => {
  reminderService.remove(id, done);
};

/* Call the removeAll method of reminderService object  and return the result back*/
exports.deleteAll = (done) => {
  reminderService.removeAll(done);
};
