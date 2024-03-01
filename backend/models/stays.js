const mongoose = require('mongoose');

const staySchema = new mongoose.Schema({
  country_name: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Stay', staySchema);