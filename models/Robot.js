const mongoose = require('mongoose');

const RobotSchema = new mongoose.Schema({
  id: {type: Number},
  username: { type: String },
  name: { type: String },
  avatar: { type: String },
  email: { type: String },
  university: {type: String},
  job: { type: String },
  company: { type: String},
  skills: {type: Array},
  phone: {type: String},
  address: {
    street_num: {type: Number},
    street_name: {type: String},
    city: {type: String},
    state_or_province: {type: String},
    postal_code: {type: String},
    country: {type: String}
  },
  password: {type: String}
});

const Robot = mongoose.model('Robot', RobotSchema);

module.exports = Robot;
