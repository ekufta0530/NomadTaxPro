const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Countries = require('./models/countries');
const Customers = require('./models/customers');


const app = express();

// Connect to MongoDB
const dbURI = 'mongodb+srv://erickufta:LskwSZrEevOg2QDM@cluster0.a3a8ugn.mongodb.net/NomadTaxProMain?retryWrites=true&w=majority'
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

  mongoose.set('debug', true)

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));


app.get('/countries', (req, res) => {
  Countries.find( { Tagline : {$ne : null}} )
    .then(result => {
      console.log(result);
      res.render('countries', { 'countries' : result } );
      next();
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

app.post('/signup', (req, res) => {
  email = req.body.username;
  password = req.body.password;

  res.render('signup');
});

app.get('/login', (req, res) => {
  email = req.body.username;
  password = req.body.password;

  res.render('login');
});

app.get('/tracker', (req, res) => {
  res.render('tracker');
});