const express = require('express');
const sportRouter = express.Router();
const SportCtrl = require('../controllers/sportsCtrl');

sportRouter.post('/',SportCtrl.create);
sportRouter.get('/',SportCtrl.get_all);

module.exports = sportRouter;