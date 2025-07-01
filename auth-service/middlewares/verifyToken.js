const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    req.user = jwt.verify(token, config.jwtSecret);
    next();
  } catch (_) {
    res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};
