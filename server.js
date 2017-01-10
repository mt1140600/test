var express = require('express');
var path = require('path');
var app = express();
app.use(express.static('dist'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist', 'index.html'))
})

var port = 80;
app.listen(port,'0.0.0.0');
