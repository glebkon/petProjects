const sql = require("./db");

const Category = function (category) {
  this.category_name = category.category_name;
  this.category_descr = category.category_descr;
  this.category_creation_date = category.category_creation_date;
};

Category.create = (newCategory, done) => {
  sql.query("insert into category set ?", newCategory, (err, res) => {
    if (err) {
      console.error("Error creating category:", err);
      return done(err);
    }

    console.log("Created category", { id: res.insertId, ...newCategory });
    done(null, { id: res.insertId, ...newCategory });
  });
};

Category.findById = (id, done) => {
  sql.query(`select * from category where category_id=${id}`, (err, res) => {
    if (err) {
      console.error("Error finding category by ID:", err);
      return done(err);
    }
    if (res.length) {
      console.log("Found category:", res[0]);
      return done(null, res[0]);
    }
    done({ kind: "not found" });
  });
};

Category.getAll = (name, done) => {
  let query = `select * from category`;
  if (name) {
    query += `where category_name like '%${name}'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.error("Error getting categories:", err);
      return done(err);
    }
    console.log("Categories:", res);
    done(null, res);
  });
};

Category.updateById = (id, upCategory, done) => {
  const query = `update category set category_name = ?, category_descr = ?, category_creation_date = ? where category_id=${id}`;
  sql.query(
    query,
    [
      upCategory.category_name,
      upCategory.category_descr,
      upCategory.category_creation_date,
    ],
    (err, res) => {
      if (err) {
        console.error("Error updating category by ID:", err);
        return done(err);
      }
      if (res.affectedRows !== 0) {
        console.log("Updated category:", { id: id, ...upCategory });
        return done(null, { id: id, ...upCategory });
      }
      done({ kind: "not found" });
    }
  );
};

Category.remove = (id, done) => {
  const deleteNoteCategoryQuery =
    "delete from notecategory WHERE category_id = ?";
  sql.query(deleteNoteCategoryQuery, id, (err, result) => {
    if (err) {
      console.error("Error deleting from NoteCategory table:", err);
      return done(err, null);
    }

    sql.query(`delete from category where category_id=${id}`, (err, res) => {
      if (err) {
        console.error("Error deleting category by ID:", err);
        return done(err);
      }
      if (res.affectedRows === 0) {
        return done({ kind: "not found" });
      }
      done(null, {
        message: "Category and related entries deleted successfully.",
      });
    });
  });
};

Category.removeAll = (done) => {
  // Delete all from NoteCategory table
  const deleteAllNoteCategoryQuery = "DELETE FROM notecategory";
  sql.query(deleteAllNoteCategoryQuery, (err, result) => {
    if (err) {
      console.error("Error deleting all from NoteCategory table:", err);
      return done(err, null);
    }

    const deleteAllCategoryQuery = "DELETE FROM category";
    sql.query(deleteAllCategoryQuery, (err, result) => {
      if (err) {
        console.error("Error deleting all from Category table:", err);
        return done(err, null);
      }

      // Return success
      done(null, {
        message: "All categories and related entries deleted successfully.",
      });
    });
  });
};

module.exports = Category;
