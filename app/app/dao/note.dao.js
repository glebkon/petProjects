const sql = require("./db");

const Note = function (note) {
  this.note_title = note.note_title;
  this.note_content = note.note_content;
  this.note_status = note.note_status;
  this.note_creation_date = note.note_creation_date;
  this.category_id = note.category_id;
  this.reminder_id = note.reminder_id;
};

Note.create = (newNote, done) => {
  const date = new Date(newNote.note_creation_date);
  if (isNaN(date.getTime())) {
    return done({ error: "incorrect date value" });
  }

  // Insert into Note table
  const insertNoteQuery =
    "INSERT INTO Note (note_title, note_content, note_status, note_creation_date) VALUES (?, ?, ?, ?)";
  const noteValues = [
    newNote.note_title,
    newNote.note_content,
    newNote.note_status,
    date.toISOString().split("T")[0],
  ];
  sql.query(insertNoteQuery, noteValues, (err, result) => {
    if (err) {
      console.error("Error inserting into Note table:", err);
      return done(err, null);
    }

    // Get the inserted note_id for the subsequent inserts
    const noteId = result.insertId;

    if (newNote.category_id) {
      // Insert into NoteCategory table
      const insertCategoryQuery =
        "INSERT INTO NoteCategory (note_id, category_id) VALUES (?, ?)";
      const categoryValues = [noteId, newNote.category_id];
      sql.query(insertCategoryQuery, categoryValues, (err, res) => {
        if (err) {
          console.error("Error inserting into NoteCategory table:", err);
          return done(err, null);
        } else {
          console.log(
            "Inserted into NoteCategory table successfully. Inserted ID:",
            res.insertId
          );
        }
      });
    }

    if (newNote.reminder_id) {
      // Insert into NoteReminder table
      const insertReminderQuery =
        "INSERT INTO NoteReminder (note_id, reminder_id) VALUES (?, ?)";
      const reminderValues = [noteId, newNote.reminder_id];
      sql.query(insertReminderQuery, reminderValues, (err, res) => {
        if (err) {
          console.error("Error inserting into NoteReminder table:", err);
          return done(err, null);
        } else {
          console.log(
            "Inserted into NoteReminder table successfully. Inserted ID:",
            res.insertId
          );
        }
      });
    }

    // Return the inserted note data
    done(null, { note_id: noteId, ...newNote });
  });
};

Note.findById = (id, done) => {
  const query = `select * from note where note_id=${id}`;
  sql.query(query, (err, res) => {
    if (err) {
      console.error("Error finding note by ID:", err);
      return done(err);
    }
    if (res.length) {
      console.log("Found note:", res[0]);
      return done(null, res[0]);
    }
    done({ kind: "not found" });
  });
};

Note.getAll = (title, done) => {
  let query = "select * from note";
  if (title) {
    query += ` where note_title like '%${title}'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.error("Error getting notes:", err);
      return done(err);
    }
    if (res.length === 0) {
      console.log("No notes found.");
      return done({ kind: "not found" });
    }
    console.log("Notes:", res);
    done(null, res);
  });
};

Note.updateById = (id, upNote, done) => {
  const date = new Date(upNote.note_creation_date);
  if (isNaN(date.getTime())) {
    return done({ error: "incorrect date value" });
  }

  const query = `update note set note_title = ?, note_content = ?, note_status = ?, note_creation_date = ? where note_id=${id}`;
  sql.query(
    query,
    [
      upNote.note_title,
      upNote.note_content,
      upNote.note_status,
      date.toISOString().split("T")[0],
    ],
    (err, res) => {
      if (err) {
        console.error("Error updating product by ID:", err);
        return done(err);
      }
      if (res.affectedRows === 0) {
        console.log("No notes found.");
        return done({ kind: "not found" });
      }

      if (upNote.reminder_id) {
        // Update reminder_id in NoteReminder table
        const updateReminderQuery =
          "update notereminder set reminder_id=? where note_id=?";
        sql.query(updateReminderQuery, [upNote.reminder_id, id], (err, res) => {
          if (err) {
            console.error("Error updating NoteReminder table:", err);
            return done(err, null);
          }
          if (res.affectedRows === 0) {
            // Insert into NoteReminder table
            const insertReminderQuery =
              "INSERT INTO notereminder (note_id, reminder_id) VALUES (?, ?)";
            const reminderValues = [id, upNote.reminder_id];
            sql.query(insertReminderQuery, reminderValues, (err, res) => {
              if (err) {
                console.error("Error inserting into NoteReminder table:", err);
                return done(err, null);
              } else {
                console.log(
                  "Inserted into NoteReminder table successfully. Inserted ID:",
                  res.insertId
                );
              }
            });
          } else {
            console.log("NoteReminder table was successfully updated.");
          }
        });
      }

      if (upNote.category_id) {
        // Update category_id in NoteCategory table
        const updateCategoryQuery =
          "update notecategory set category_id=? where note_id=?";
        sql.query(updateCategoryQuery, [upNote.category_id, id], (err, res) => {
          if (err) {
            console.error("Error updating notecategory table:", err);
            return done(err, null);
          }
          if (res.affectedRows === 0) {
            // Insert into NoteCategory table
            const insertCategoryQuery =
              "INSERT INTO notecategory (note_id, category_id) VALUES (?, ?)";
            sql.query(
              insertCategoryQuery,
              [id, upNote.category_id],
              (err, res) => {
                if (err) {
                  console.error(
                    "Error inserting into NoteCategory table:",
                    err
                  );
                  return done(err, null);
                } else {
                  console.log(
                    "Inserted into NoteCategory table successfully. Inserted ID:",
                    res.insertId
                  );
                }
              }
            );
          } else {
            console.log("NoteCategory table was successfully updated.");
          }
        });
      }

      console.log("Updated product:", { id: id, ...upNote });
      return done(null, { id: id, ...upNote });
    }
  );
};

Note.remove = (id, done) => {
  const deleteReminderQuery = "delete from notereminder WHERE note_id = ?";
  sql.query(deleteReminderQuery, id, (err, result) => {
    if (err) {
      console.error("Error deleting from NoteReminder table:", err);
      return done(err, null);
    }

    const deleteCategoryQuery = "DELETE FROM notecategory WHERE note_id = ?";
    sql.query(deleteCategoryQuery, id, (err, result) => {
      if (err) {
        console.error("Error deleting from NoteCategory table:", err);
        return done(err, null);
      }

      sql.query(`delete from note where note_id=${id}`, (err, res) => {
        if (err) {
          console.error("Error deleting note by ID:", err);
          return done(err);
        }
        if (res.affectedRows === 0) {
          return done({ kind: "not found" });
        }
        done(null, {
          message: "Note and related entries deleted successfully.",
        });
      });
    });
  });
};

Note.removeAll = (done) => {
  // Delete all from NoteReminder table
  const deleteAllRemindersQuery = "DELETE FROM NoteReminder";
  sql.query(deleteAllRemindersQuery, (err, result) => {
    if (err) {
      console.error("Error deleting all from NoteReminder table:", err);
      return done(err, null);
    }

    // Delete all from NoteCategory table
    const deleteAllCategoriesQuery = "DELETE FROM NoteCategory";
    sql.query(deleteAllCategoriesQuery, (err, result) => {
      if (err) {
        console.error("Error deleting all from NoteCategory table:", err);
        return done(err, null);
      }

      // Delete all from Note table
      const deleteAllNotesQuery = "DELETE FROM Note";
      sql.query(deleteAllNotesQuery, (err, result) => {
        if (err) {
          console.error("Error deleting all from Note table:", err);
          return done(err, null);
        }

        // Return success
        done(null, {
          message: "All notes and related entries deleted successfully.",
        });
      });
    });
  });
};

module.exports = Note;
