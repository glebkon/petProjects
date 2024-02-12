const jwt = require("jsonwebtoken");
const config = require("../../config.js");

function verifyUser({ email, password }, userData) {
  return email === userData.email && password === userData.password;
}

function createJWT(userData) {
  const payload = {
    role: "USER",
    email: userData.email,
    name: userData.name,
  };

  const token = jwt.sign(payload, config.AUTH_SECRET, {
    expiresIn: 3600,
  });

  return token;
}

module.exports = {
  verifyUser,
  createJWT
};
