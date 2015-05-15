var express = require("express"),
    app = express(),
    path = require("path"),
    _ = require("underscore"),
    bodyParser = require("body-parser");

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

//parse the bod
app.use(bodyParser.urlencoded({ extended: true }));

var phrases = [
	{id: 0, word:"npm", definition:"Node Package Manager, a management system for Node packages"},
	{id: 1, word: "Relational Database", definition: "SQL db, a database that keeps data in separate but related tables"},
	{id: 2, word: "Tuna", definition: "A type of fish, do you even sushi bro?"}
];

app.get("/", function (req, res){
	res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.get("/phrases", function(req, res){
	console.log(__dirname);
	res.send(JSON.stringify(phrases));
});

app.post("/phrases", function(req, res){
	var newPhrase = req.body;
	newPhrase.id = phrases[phrases.length - 1].id + 1;
	phrases.push(newPhrase);
	res.send(JSON.stringify(newPhrase));
});

app.delete("/phrases/:id", function(req, res){
	var targetId = parseInt(req.params.id);
	var targetItem = _.findWhere(phrases, {id: targetId});
	var index = phrases.indexOf(targetItem);
	phrases.splice(index, 1);
	res.send(JSON.stringify(targetItem));
});

app.listen(3000, function (){
  console.log("listening on port 3000");
});