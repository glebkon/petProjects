const sql = require("./db");

/* constructor to initialize note with note_title, note_content, note_status,
 note_creation_date,note_id and reminder_id  as its properties*/
const Note = function (note) {
  this.note_title = note.note_title;
  this.note_content = note.note_content;
  this.note_status = note.note_status;
  this.note_creation_date = note.note_creation_date;
  this.category_id = note.category_id;
  this.reminder_id = note.reminder_id;
};

Note.create = (newNote, done) => {
  // Insert into Note table
  const insertNoteQuery =
    "INSERT INTO Note (note_title, note_content, note_status, note_creation_date) VALUES (?, ?, ?, ?)";
  const noteValues = [
    newNote.note_title,
    newNote.note_content,
    newNote.note_status,
    newNote.note_creation_date,
  ];
  sql.query(insertNoteQuery, noteValues, (err, result) => {
    if (err) {
      console.error("Error inserting into Note table:", err);
      return done(err, null);
    }

    // Get the inserted note_id for the subsequent inserts
    const noteId = result.insertId;

    // Insert into NoteCategory table
    const insertCategoryQuery =
      "INSERT INTO NoteCategory (note_id, category_id) VALUES (?, ?)";
    const categoryValues = [noteId, newNote.category_id];
    sql.query(insertCategoryQuery, categoryValues, (err, result) => {
      if (err) {
        console.error("Error inserting into NoteCategory table:", err);
        return done(err, null);
      }

      // Insert into NoteReminder table
      const insertReminderQuery =
        "INSERT INTO NoteReminder (note_id, reminder_id) VALUES (?, ?)";
      const reminderValues = [noteId, newNote.reminder_id];
      sql.query(insertReminderQuery, reminderValues, (err, result) => {
        if (err) {
          console.error("Error inserting into NoteReminder table:", err);
          return done(err, null);
        }

        // Return the inserted note data
        done(null, { note_id: noteId, ...newNote });
      });
    });
  });
};

/* 
  findById should be a function that calls the query function on sql object 
  to fetch the note by the provided Id from the notesdb schema using select query.
  Join queries should be used to join Note, NoteCategory and NoteReminder tables
*/

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

/* 
  getAll should be a function that calls the query function on sql object to fetch all 
  the notes or notes with specific title from the notesdb   schema using select query.
  Join queries should be used to join Note, NoteCategory and NoteReminder tables.
*/

Note.getAll = (title, done) => {
  let query = "select * from note";
  if (title) {
    query += `where note_title like '%${title}'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.error("Error getting notes:", err);
      return done(err);
    }
    console.log("Notes:", res);
    done(null, res);
  });
};

/* 
  updateById should be a function that calls query function on sql object 
  to update the note for the given id from the notesdb schema using update query
*/

Note.updateById = (id, upNote, done) => {
  const query = `update note set note_title = ?, note_content = ?, note_status = ?, note_creation_date = ? where note_id=${id}`;
  sql.query(
    query,
    [
      upNote.note_title,
      upNote.note_content,
      upNote.note_status,
      upNote.note_creation_date,
    ],
    (err, res) => {
      if (err) {
        console.error("Error updating product by ID:", err);
        return done(err);
      }
      if (res.affectedRows !== 0) {
        console.log("Updated product:", { id: id, ...upNote });
        return done(null, { id: id, ...upNote });
      }
      done({ kind: "not found" });
    }
  );
};

/* 
  remove should be a function that calls query function on sql object 
  to delete the note for the given id from the notesdb schema using delete query
*/
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

/* 
  removeAll should be a function that calls query function on sql object 
  to delete all the notes from the notesdb schema using delete query
*/
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
