const sql = require("./db");

const Reminder = function (reminder) {
  this.reminder_name = reminder.reminder_name;
  this.reminder_descr = reminder.reminder_descr;
  this.reminder_type = reminder.reminder_type;
  this.reminder_creation_date = reminder.reminder_creation_date;
};

Reminder.create = (newReminder, done) => {
  sql.query("insert into reminder set ?", newReminder, (err, res) => {
    if (err) {
      console.error("Error creating reminder:", err);
      return done(err);
    }

    console.log("Created reminder", { id: res.insertId, ...newReminder });
    done(null, { id: res.insertId, ...newReminder });
  });
};

Reminder.findById = (id, done) => {
  sql.query(`select * from reminder where reminder_id=${id}`, (err, res) => {
    if (err) {
      console.error("Error finding reminder by ID:", err);
      return done(err);
    }
    if (res.length) {
      console.log("Found reminder:", res[0]);
      return done(null, res[0]);
    }
    done({ kind: "not found" });
  });
};

Reminder.getAll = (name, done) => {
  let query = `select * from reminder`;
  if (name) {
    query += `where reminder_name like '%${name}'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.error("Error getting reminders:", err);
      return done(err);
    }
    console.log("Reminders:", res);
    done(null, res);
  });
};

Reminder.updateById = (id, upReminder, done) => {
  const query = `update reminder set reminder_name = ?, reminder_descr = ?, reminder_type = ?, reminder_creation_date = ? where reminder_id=${id}`;
  sql.query(
    query,
    [
      upReminder.reminder_name,
      upReminder.reminder_descr,
      upReminder.reminder_type,
      upReminder.reminder_creation_date,
    ],
    (err, res) => {
      if (err) {
        console.error("Error updating reminder by ID:", err);
        return done(err);
      }
      if (res.affectedRows !== 0) {
        console.log("Updated reminder:", { id: id, ...upReminder });
        return done(null, { id: id, ...upReminder });
      }
      done({ kind: "not found" });
    }
  );
};

Reminder.remove = (id, done) => {
  const deleteNoteReminderQuery =
    "delete from notereminder WHERE reminder_id = ?";
  sql.query(deleteNoteReminderQuery, id, (err, result) => {
    if (err) {
      console.error("Error deleting from NoteReminder table:", err);
      return done(err, null);
    }

    sql.query(`delete from reminder where reminder_id=${id}`, (err, res) => {
      if (err) {
        console.error("Error deleting reminder by ID:", err);
        return done(err);
      }
      if (res.affectedRows === 0) {
        return done({ kind: "not found" });
      }
      done(null, {
        message: "Reminder and related entries deleted successfully.",
      });
    });
  });
};

Reminder.removeAll = (done) => {
  // Delete all from NoteReminder table
  const deleteAllNoteReminderQuery = "DELETE FROM notereminder";
  sql.query(deleteAllNoteReminderQuery, (err, result) => {
    if (err) {
      console.error("Error deleting all from NoteReminder table:", err);
      return done(err, null);
    }

    const deleteAllRemindersQuery = "DELETE FROM reminder";
    sql.query(deleteAllRemindersQuery, (err, result) => {
      if (err) {
        console.error("Error deleting all from Reminder table:", err);
        return done(err, null);
      }

      // Return success
      done(null, {
        message: "All reminders and related entries deleted successfully.",
      });
    });
  });
};

module.exports = Reminder;
