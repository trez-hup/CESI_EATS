const { Router } = require('express');
const ctrl = require('../controllers/auth.controller');
const verify = require('../middlewares/verifyToken');

const r = Router();
r.post('/register', ctrl.register);
r.post('/login', ctrl.login);
r.post('/refresh', ctrl.refreshToken);
r.post('/logout', ctrl.logout);

r.get('/me', verify, ctrl.getMe);
r.put('/me', verify, ctrl.updateMe);
r.delete('/me', verify, ctrl.deleteMe);

module.exports = r;
