// Import the necessary modules
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of express
const app = express();

app.set('view engine', 'ejs');

// Use body-parser middleware to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a simple GET route
app.get('/countries', (req, res) => {
  res.render('countries');
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

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});