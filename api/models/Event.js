const mongoose = require('mongoose');
const Event = mongoose.Schema ({
  name: { type: String, default: "" },
  cover : { type: String, default: "" },
  description : { type: String, default: "" },
  sportId : { type:String, default: ""},
  participants : { type: Array, default: [] },
  level : { type: Number , default:0 },
  state : {type: String, default:'planifie'},
  id: { type: String, default: "" ,unique: true },
},{
    collection: 'events'
});

module.exports = mongoose.model('Event', Event);