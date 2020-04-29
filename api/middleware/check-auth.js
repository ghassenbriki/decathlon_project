const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/general');

const AccessControl = require('accesscontrol');
const ac = new AccessControl({

});

module.exports = (req, res, next) => {
  try {
    req.tokenData = jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET);
    req.ac = ac;
    next();

  } catch (error) {
    return res.status(401).json({ msg: 'auth failed' });
  }
}