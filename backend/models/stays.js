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

const Stay = mongoose.model('Stay', staySchema);

module.exports = Stay;