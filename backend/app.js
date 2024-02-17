const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const underscore = require('underscore');
const mongoose = require('mongoose');
const Countries = require('./models/countries');
const Customers = require('./models/customers');


const app = express();

// Connect to MongoDB

//Fill in Password!!!
const dbURI = 'mongodb+srv://erickufta:<password>.@cluster0.a3a8ugn.mongodb.net/NomadTaxProMain?retryWrites=true&w=majority'
mongoose.connect(dbURI)
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

  mongoose.set('debug', true)

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));


// app.get('/countries', (req, res) => {
//   // const countries = JSON.parse(fs.readFileSync('./countries/countries.json', 'utf8'));
//   const countries = Country.find({ display: true });
//   console.log(countries);
//   // const display_countries = underscore.where(countries, { 'display' : true })
//   // res.render('countries', { 'countries' :  display_countries });
// });

app.get('/countries', (req, res) => {
  Countries.find()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/users', (req, res) => {
  Customers.find()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/', (req, res) => {
  res.redirect('/countries');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('tracker', (req, res) => {
  res.render('tracker');
});