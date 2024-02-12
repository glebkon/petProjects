const authService = require("./authService");
const userService = require("../Users/userService");

function registerUser(userData, done) {
  userService.findUser(userData.email, (err, userFound) => {
    if (err) {
      done(err);
    } else {
      if (userFound) {
        return done({ error: "User already exists" });
      } else {
        userService.registerUser(userData, done);
      }
    }
  });
}

function loginUser({ email, password }, done) {
  userService.findUser(email, (err, userFound) => {
    if (err) {
      done(err);
    } else {
      const userVerified = authService.verifyUser(
        { email, password },
        userFound
      );
      if (userVerified) {
        const jwtToken = authService.createJWT(userFound);
        done(undefined, jwtToken);
      } else {
        done({ error: "User not verified" });
      }
    }
  });
}

module.exports = {
  registerUser,
  loginUser,
};
