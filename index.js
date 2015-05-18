var express = require("express"),
    app = express(),
    path = require("path"),
    _ = require("underscore"),
    bodyParser = require("body-parser");

// requires the database
var db = require("./models");

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

//parse the bod
app.use(bodyParser.urlencoded({ extended: true }));

// var phrases = [
// 	{id: 0, word:"npm", definition:"Node Package Manager, a management system for Node packages"},
// 	{id: 1, word: "Relational Database", definition: "SQL db, a database that keeps data in separate but related tables"},
// 	{id: 2, word: "Tuna", definition: "A type of fish, do you even sushi bro?"}
// ];

app.get("/", function (req, res){
	res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

// get route to return phrases from db
app.get("/phrases", function(req, res){
	db.Catchphrase.find({},
		function(err, phrases){
			res.send(phrases);
		});
});

//post route to create new phrases in the db
app.post("/phrases", function(req, res){
	var newPhrase = req.body;
	db.Catchphrase.create(newPhrase, 
		function (err, phrase){
			res.send(201, phrase);
		});
});

// delete route to remove phrases from the db
app.delete("/phrases/:_id", function(req, res) {
	db.Catchphrase.findOneAndRemove({
	 	_id: req.params._id
	 }, function(err, phrase){
	 	res.send(204);
	 });
});

app.listen(3000, function (){
  console.log("listening on port 3000");
});