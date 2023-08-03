const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET_KEY;

function setToken(paramToken, duration = null) {
  return jwt.sign(paramToken, jwtSecret, { expiresIn: duration || '365d' });
}

function decodeToken(token) {
  const strToken = token.split(' ')[1];
  return jwt.verify(strToken, jwtSecret);
}

module.exports = {
  setToken,
  decodeToken,
};
