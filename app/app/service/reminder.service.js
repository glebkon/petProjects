const reminderDAO = require("../dao/reminder.dao");

exports.create = (newReminder, done) => {
  reminderDAO.create(newReminder, (err, result) => {
    if (err) {
      return done(err);
    }
    done(null, result);
  });
};

exports.getAll = (name, done) => {
  reminderDAO.getAll(name, (err, reminders) => {
    if (err) {
      return done(err);
    }
    done(null, reminders);
  });
};

exports.findById = (id, done) => {
  reminderDAO.findById(id, (err, reminder) => {
    if (err) {
      return done(err);
    }
    done(null, reminder);
  });
};

exports.updateById = (id, upReminder, done) => {
  reminderDAO.updateById(id, upReminder, (err, result) => {
    if (err) {
      return done(err);
    }
    done(null, result);
  });
};

exports.remove = (id, done) => {
  reminderDAO.remove(id, (err, result) => {
    if (err) {
      return done(err);
    }
    done(null, result);
  });
};

exports.removeAll = (done) => {
  reminderDAO.removeAll((err, result) => {
    if (err) {
      return done(err);
    }
    done(null, result);
  });
};
