const express = require('express');
const userRouter = express.Router();
const UserCtrl = require('../controllers/usersCtrl');

userRouter.post('/signup', UserCtrl.signup);
userRouter.post('/login',UserCtrl.login);
userRouter.get('/', UserCtrl.get_all);
userRouter.get('/coaches', UserCtrl.get_coaches);
module.exports = userRouter;

