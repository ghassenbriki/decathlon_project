const express = require('express');
const eventRouter = express.Router();
const EventCtrl = require('../controllers/eventsCtrl');

eventRouter.post('/',EventCtrl.create);
eventRouter.get('/:level/:sportId',EventCtrl.get);
eventRouter.get('/:id',EventCtrl.find_one);

module.exports = eventRouter;