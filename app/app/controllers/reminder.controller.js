const reminderService = require("../service/reminder.service.js");

exports.create = (newReminder, done) => {
  reminderService.create(newReminder, (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

exports.getAll = (name, done) => {
  reminderService.getAll(name, (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

exports.findById = (id, done) => {
  reminderService.findById(id, (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

exports.update = (id, upReminder, done) => {
  reminderService.updateById(id, upReminder, (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

exports.remove = (id, done) => {
  reminderService.remove(id, (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

exports.removeAll = (done) => {
  reminderService.removeAll((err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};
