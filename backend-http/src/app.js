const express = require('express');
const path = require('path');

const port = 3000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  var datar = [
      { type: 0, id: "bob", payload: "e" },
      { type: 1, id: "bob", payload: "e" },
      { type: 2, id: "bob", payload: "e" },
  ];

  res.render('index', {
    data: datar
  });
});

app.use((err, request, response, next) => {
  // log the error, for now just console.log
  console.log(err)
  response.status(500).send('Something broke!')
});

module.exports = app;