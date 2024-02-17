const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  citizenship: { type: String, required: true },
  green_card: { type: Boolean, default: false },
  active: { type: Boolean, required: true },
  favorites: [{ type: String }],
  created_at: { type: Date, required: true }
});

module.exports = mongoose.model('Customers', customerSchema);