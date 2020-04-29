const mongoose = require('mongoose');
const User = mongoose.Schema ({
  first_name: { type: String, default: "" },
  last_name : { type: String, default: "" },

  email: { type: String, default: "" },
  pass: { type: String, default: "" },

  avatar: { type: String, default: "" },
  phone: { type: String, default: "" },
  role: { type: String, default: "" },
  sportId : { type:String, default: ""},
  level : { type: Number , default:0 },
  establishment  : { type:String, default: ""},
  events : { type: Array, default: [] },
  is_admin: { type: Boolean, default: false },
  id: { type: String, default: "" ,unique: true },
},{
    collection: 'users'
});

module.exports = mongoose.model('User', User);