const Event = require('../models/Event');

/* --------------------------- Get Events ---------------------------------- */
exports.get = (req, res, next) => {
  Event.find({'level':req.body.level,'sportId':req.body.sportId}, function (err, events) {
    res.status(200).json({ events });
  });
}


/* --------------------------- Find Event by id---------------------------------- */
exports.find_one = (req, res, next) => {
  Event.findById(req.params.id).exec().then(doc => {
    if (doc) res.status(200).json(doc);
    else res.status(404).json({ msg: "event not found" });
  }).catch(err => { res.status(500).json({ err: err }); })
}


/* --------------------------- Create Event ---------------------------------- */
exports.create = (req, res, next) => {
  const event = new Event(req.body);
  event.save().then(rslt=>{
    res.status(201).json(rslt);
  }).catch(err=>{ res.status(500).json({err: err}); });
}
