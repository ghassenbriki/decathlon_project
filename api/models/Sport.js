const mongoose = require('mongoose');
const Sport = mongoose.Schema ({
  name: { type: String, default: "" },
  logo : { type: String, default: "" },
  id: { type: String, default: "" ,unique: true },
},{
    collection: 'sports'
});

module.exports = mongoose.model('Sport', Sport);