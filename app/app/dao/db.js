const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  database: dbConfig.DB,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.log("error occurred while connecting", err);
  } else {
    console.log("successfully connected to the database");
  }
});

module.exports = connection;
