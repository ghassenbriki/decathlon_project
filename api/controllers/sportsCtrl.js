const Sport = require('../models/Sport');

/* --------------------------- Create Sport ---------------------------------- */

exports.create = (req, res, next) => {
  const sport = new Sport(req.body);
  sport.save().then(rslt=>{
    res.status(201).json(rslt);
  }).catch(err=>{ res.status(500).json({err: err}); });
}

/* --------------------------- Get Sports ---------------------------------- */

exports.get_all = (req, res, next) => {
  /*if (!req.tokenData.is_admin) return res.status(401).json({ msg: 'not authorized' });*/

  Sport.find().exec().then(docs => {
    if (!docs) return res.status(200).json({ sports: [], count: 0 });

    Sport.find().countDocuments(function (e, cnt) {
      res.status(200).json({ sports: docs, count: (!cnt) ? 0 : cnt });
    }).catch(err => { res.status(500).json({ err: err }); });
  }).catch(err => { res.status(500).json({ err: err }); });
}