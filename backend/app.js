const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const Countries = require('./models/countries');
const Customer = require('./models/customers');


const app = express();

// Connect to MongoDB
const dbURI = 'mongodb+srv://erickufta:LskwSZrEevOg2QDM@cluster0.a3a8ugn.mongodb.net/NomadTaxProMain?retryWrites=true&w=majority'
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

  // mongoose.set('debug', true)

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/countries', (req, res) => {
  Countries.find( { Tagline : {$ne : null}} )
    .then(result => {
      console.log(result);
      res.render('countries', { 'countries' : result } );
    })
    .catch(err => {
      console.log(err);
    });
});


app.get('/', (req, res) => {
  res.redirect('/countries');
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
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
    res.send("User already exists");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;
    console.log(password);
    const newCustomer = new Customer(
      { email : email, password : password, fname : fname, lname: lname}
    );
    newCustomer.save()
    res.send("User created");
  }
});

app.post('/login', async (req, res) => {
  try {
    const check = await Customer.findOne({ email: req.body.username });
    if (!check) {
      res.send("User not found");
    }
    else if (await bcrypt.compare(req.body.password, check.password)) {
      res.render('tracker');
    }
  } catch (error) {
    console.log(error);
  }
});

app.get('/tracker', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('tracker');
  } else {
    res.redirect('/login');
  }
});