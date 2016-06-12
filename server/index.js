var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Flower = require('./db');
var path = require('path');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/api/flowers', function(req, res){
	var flower = new Flower({
			name: req.body.name, 
			season: req.body.season, 
			meaning: req.body.meaning
		}); //creates new mongo flower and pass in configuration object with 3 parameters in schema
	flower.save(function(err, result){
		if (err) return res.json(err);
		return res.json(result);
	});
});

app.get('/api/flowers', function(req, res){
	Flower.find(function(err, result){
	if (err) return res.json(err);
	return res.json(result);
	});
});

app.get('/api/flowers/:id', function(req, res){
	Flower.find({_id: req.params.id},function(err, result){ //access to id params
		if (err) return res.json(err);
		return res.json(result);
	});
});
 
app.put('/api/flowers/:id', function(req, res){
	console.log(req.body);
	Flower.findOne({_id: req.params.id}, function(err, flower){
		flower.name = req.body.name;
		flower.season = req.body.season;
		flower.meaning = req.body.meaning;
		flower.save(function(err,result) {
			if (err) return res.json(err);
			return res.json(result);
		});
	});
});

app.delete('/api/flowers/:id', function(req, res){
	Flower.findOneAndRemove({_id: req.params.id}, function(err){
		if (err) return res.json(err);
		return res.json({status: 200, message: "O.K."}); //return something to let you know working correctly
	});
});



app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});












app.listen(3000, function(){
	console.log('listening on port 3000');
});
