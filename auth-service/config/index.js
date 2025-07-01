// auth-service/config/index.js
require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  refreshTokenSecret: process.env.REFRESH_SECRET
};
