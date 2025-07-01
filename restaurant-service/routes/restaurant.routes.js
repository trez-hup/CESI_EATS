const { Router } = require('express');
const c = require('../controllers/restaurant.controller');
const r = Router();
r.post('/', c.create);
r.get('/',  c.list);
r.get('/:id', c.get);
r.put('/:id', c.update);
r.delete('/:id', c.remove);
module.exports = r;
