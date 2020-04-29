const User  = require('../models/User');
const Event = require('../models/Event');

const jwt = require('jsonwebtoken');
const fs = require('file-system');

const { JWT_SECRET, JWT_EXPIRES_In } = require('../../config/general');


/* --------------------------- SIGN UP ---------------------------------- */
exports.signup = (req, res, next)=>{
  User.findOne({email: req.body.email}).exec().then(doc=>{
    if(doc !== null) return res.status(409).json({msg: "email already exist"});
    req.body['is_admin']    = false;
    const usr = new User(req.body);
    usr.avatar = '';
    usr.save().then(rslt=>{
      res.status(201).json(rslt);
    }).catch(err=>{ res.status(500).json({err: err}); });
  }).catch(err=>{ res.status(500).json({err: err}); })
}

/* ---------------------------  LOGIN ---------------------------------- */
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email, password: req.body.password }).exec().then(usr => {
    if (!usr || req.body.pass == "") return res.status(401).json({ msg: 'auth failed' });

    const token = jwt.sign({
      email: usr.email,
      role : usr.role,
      id: usr.id,
      is_admin: usr.is_admin
    },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_In }
    );
    console.log('logged in');
    res.status(200).json({ user: usr, token: token });

  }).catch(err => { res.status(500).json({ err: err }); })
}

/* --------------------------- Get all users ---------------------------------- */
exports.get_all = (req, res, next) => {
  /*if (!req.tokenData.is_admin) return res.status(401).json({ msg: 'not authorized' });*/

  User.find().exec().then(docs => {
    if (!docs) return res.status(200).json({ users: [], count: 0 });

    User.find().countDocuments(function (e, cnt) {
      res.status(200).json({ users: docs, count: (!cnt) ? 0 : cnt });
    }).catch(err => { res.status(500).json({ err: err }); });
  }).catch(err => { res.status(500).json({ err: err }); });

}

/* --------------------------- participate in Event ---------------------------------- */
exports.participate_in_event = (req, res, next) => {
  Event.findOneAndUpdate({ id: req.params.eventId }, { $addToSet: { participants: req.params.userId } }, { new: true }
    ).then(event => {
      if (!event) return res.status(404).json({ msg: 'event not exist' });
      User.findOneAndUpdate({ id: req.params.userId }, { $addToSet: { events: req.params.eventId } }, { new: true }
        ).then(user =>{
            res.status(200).json({ success: true });
        }).catch(err => {
          res.status(500).json({err : err});
        })
    }).catch(err => {
      res.status(500).json({ err: err });
  });
}


/* --------------------------- Get coaches by sport---------------------------------- */
exports.get_coaches = (req, res, next) => {
  User.find({ 'role': 'coach','sportId':req.body.sportId }, function (err, coaches) {
    if (coaches) res.status(200).json(coaches);
    else res.status(404).json({ msg: "not found" });
  }).catch(err => { res.status(500).json({ err: err }); })
}