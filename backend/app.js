const fs = require('fs');

fs.readFile('../countries/countries.json', (err, data ) => {
  if (err) throw err;
  const countries = JSON.parse(data);
  console.log(countries);
});