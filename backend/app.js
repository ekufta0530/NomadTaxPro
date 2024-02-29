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

passport.serializeUser(function(user, done) {
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

passport.use(new LocalStrategy(async function(username, password, done) {
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
    user = req.user;
    console.log(user)
    // res.redirect('/tracker', { 'user' : req.user });
  }
  res.redirect('/login');
}

function isNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/tracker');
}


// ROUTES

app.post('/login', isNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/tracker',
  failureRedirect: '/login?error=true'
}));


app.get('/countries', isAuthenticated, (req, res) => {
  console.log(req.user)
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
    res.redirect("/login");
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

app.get('/tracker', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('tracker');
  } else {
    res.redirect('/login');
  }
});

app.get('/add-stay', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('add-stay');
  } else {
    res.redirect('/login');
  }
});
