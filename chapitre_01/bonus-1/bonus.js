const express = require('express');
const app = express();
const responseAPICountries = require('./dataCountries.js');
const port = 8000;
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});

app.get('/', (req, res) => {
  res.send("Authors API");
});

app.get('/country', (req, res) => {
  res.send(responseAPICountries.responseAPICountries);
})

app.get('/country/:item', (req, res) => {
  for (let country of responseAPICountries.responseAPICountries) {
    if (req.params.item === country.name) {
      console.log(country)
      res.send(country);
    }
  }
});