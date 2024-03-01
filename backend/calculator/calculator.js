const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const Customer = require('./models/customers');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.dbURI)
  .then((done) => app.listen(3000))
  .catch((err) => console.log(err));
mongoose.set('debug', true)

// MIDDLEWARE
app.use(morgan('dev'));

app.set('view engine', 'ejs');

// DEV SETTINGS
user = 'eric@gmail.com';

// ROUTES

app.get('/', (req, res) => {
  Customer.findOne({ email: user })
    .populate('stays') 
    .then(result => {
      const totals = calculateFEIEDays(result.stays, periodStartDate);
      // period start date has to be an attribute in Customer that can be pulled
      console.log(`Days Outside US: ${totals.daysOutsideUS}, Untracked Days: ${totals.untrackedDays}`);
      res.render('index', { result: totals }); 
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('An error occurred');
    });
});


// Function to calculate the number of days outside the US
function calculateFEIEDays(stays, periodStartDate) {
    const periodStart = new Date(periodStartDate);
    const periodEnd = new Date(periodStart);
    periodEnd.setDate(periodEnd.getDate() + 329); // Set to 330 days later
  
    let daysOutsideUS = 0;
    let trackedDays = new Set();
  
    stays.forEach(stay => {
      const start = new Date(stay.start_date);
      const end = new Date(stay.end_date);
      console.log(start, end)
  
      // Iterate over each day in the stay
      for (let day = start; day <= end; day.setDate(day.getDate() + 1)) {
        // Check if the day is within the 330-day period and not in the US
        if (day >= periodStart && day <= periodEnd && stay.country_name !== "United States") {
          const dayStr = day.toISOString().split('T')[0]; // Format YYYY-MM-DD
          // Check if we have already counted this day
          if (!trackedDays.has(dayStr)) {
            daysOutsideUS++;
            trackedDays.add(dayStr);
          }
        }
      }
    });
  
    const totalDaysInPeriod = 330;
    const untrackedDays = totalDaysInPeriod - trackedDays.size;
  
    return {
      daysOutsideUS,
      untrackedDays
    };
  }
  
  const periodStartDate = "2024-01-01";