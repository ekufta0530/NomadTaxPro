const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Stay = require('./stays');

const customerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  citizenship: { type: String},
  green_card: { type: Boolean, default: false },
  active: { type: Boolean },
  favorites: [{ type: String }],
  stays: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stay' }],
  periodStartDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);