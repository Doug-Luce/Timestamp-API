// Timestamp microservice written by Doug Luce
var express = require('express');
var app = express();
var moment = require('moment');

app.use(express.static('public'));

app.get('/:query', function(req, res) {
  var query = req.params.query;
  var m = isNum(query) ? moment(query, "X") : moment(query, "MMMM D, YYYY");
  
  if(m.isValid()) {
    var unixTime = m.format("X");
    var naturalTime = m.format("MMMM, D, YYYY");
    var timeObj = {
    'unix' : unixTime,
    'natural': naturalTime
  };
    res.send(timeObj);
  } else {
    res.send({'Bad Request': 'Try Again'});
  }
  
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function isNum(val) {
  var isnum = /^\d+$/.test(val);
  return isnum;
}