var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('thieflist', ['thieflist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/thieflist', function (req, res) {
  console.log('I received a GET request');

  db.thieflist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/thieflist', function (req, res) {
  console.log(req.body);
  db.thieflist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/thieflist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.thieflist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/thieflist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.thieflist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/thieflist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.thieflist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, crime: req.body.crime, area: req.body.area}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");