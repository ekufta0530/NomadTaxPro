const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const Countries = require('./models/countries');
const Customer = require('./models/customers');
const Stay = require('./models/stays');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
// mongoose.set('debug', true)

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));

// AUTHENTICATION
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Customer.findById(id).exec();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new LocalStrategy(async function (username, password, done) {
  try {
    const user = await Customer.findOne({ email: username }).exec();
    // console.log(user.password);
    // console.log(user.email);
    if (!user) {
      console.log("user does not exist")
      return done(null, false, { message: 'Incorrect username.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (err) {
    console.log(err)
    return done(err);
  }
}));

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
  }
  next();
}

function isNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  next();
}

// ROUTES

app.post('/login', isNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/tracker',
  failureRedirect: '/login?error=true'
}));

app.get('/countries', isAuthenticated, (req, res) => {
  if (req.isAuthenticated()) {
  Countries.find({ Tagline: { $ne: null } })
    .then(result => {
      res.render('countries', { 'countries': result });
    })
    .catch(err => {
      console.log(err);
    });
  } else {
    res.redirect('/login');
  }
});

app.get('/countries/:country', isAuthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    Countries.findOne({ country_name : req.params.country })
      .then(country => {
        if (country) {
          // Country found, render the page
          res.render('country', { 'country': country });
        } else {
          // Country not found, send 404 response
          res.status(404).send('Page not found');
        }
      })
      .catch(err => {
        console.log(err);
        // Handle other errors
        res.status(500).send('Internal Server Error');
      });
  } else {
    res.redirect('/login');
  }
});

app.get('/', (req, res) => {
  res.redirect('/countries');
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post('/signup', async (req, res) => {
  email = req.body.username;
  password = req.body.password;
  fname = req.body.fname;
  lname = req.body.lname;
  const existingUser = await Customer.findOne({ email: email });

  if (existingUser) {
    res.redirect("/login");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;
    const newCustomer = new Customer(
      { email: email, password: password, fname: fname, lname: lname }
    );
    newCustomer.save()
    res.send("User created");
  }
});

app.get('/tracker', (req, res) => {
  if (req.isAuthenticated()) {
    Customer.findOne({ email: req.user.email })
      .populate('stays')
      .then(result => {
        res.render('tracker', {
          stays: result.stays,
          user: result.fname,
          stayAnalysis : calculateFEIEDays(result.stays, "2024-01-01")
        });
      })
  } else {
    res.redirect('/login');
  }
});


app.get('/add-stay', (req, res) =>
  res.render('add-stay')
);

app.post('/add-stay', (req, res) => {
  const stay = new Stay({
    country_name: req.body.country_name,
    start_date: req.body.start_date,
    end_date: req.body.end_date
  })
  stay.save()
    .then((result) => {
      Customer.findOneAndUpdate({ email: req.user.email }, { $push: { stays: result._id } })
        .then((result) => {
          res.redirect('/tracker');
        })
    })
    .catch(err => {
      console.log(err);
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
