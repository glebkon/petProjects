const usersDao = require("./users.dao");

const saveUser = function (userReq, done) {
  usersDao.saveUser(userReq, (err, results) => {
    if (err) {
      // EXITING
      return done({ "STATUS": "DATA_ERROR", "error": "Encountered data error in saving user..!" });
    }

    // EXITING with results
    return done(null, results);
  });
}

const findUsers = function (done) {
  usersDao.findUsers((err, results) => {
    if (err) {
      // EXITING
      return done({ "STATUS": "DATA_ERROR", "error": "Encountered data error in fetching users..!" });
    }

    // EXITING with results
    return done(null, results);
  });
}

const getUserByEmail = function (email, done) {
  usersDao.getUserByEmail(email, (err, results) => {
    if (err) {
      // EXITING
      return done({ "STATUS": "DATA_ERROR", "error": "Encountered data error in getting user details..!" });
    }

    // EXITING with results
    return done(null, results);
  });
}

const getUserById = function (userId, done) {
  usersDao.getUserById(userId, (err, results) => {
    if (err) {
      // EXITING
      return done({ "STATUS": "DATA_ERROR", "error": "Encountered data error in getting user details..!" });
    }

    // EXITING with results
    return done(null, results);
  });
}

const updateUserDetails = function (userId, updateReq, done) {
  usersDao.updateUserDetails(userId, updateReq, (err, results) => {
    if (err) {
      // EXITING
      return done({ "STATUS": "DATA_ERROR", "error": "Encountered data error in updating user details..!" });
    }

    // EXITING with results
    return done(null, results);
  });
}

module.exports = {
  saveUser,
  findUsers,
  getUserByEmail,
  updateUserDetails,
  getUserById
}