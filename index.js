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
	{id: 0, word:"airplane", definition:"A vehicle to transport people via the sky"},
	{id: 1, word: "car", definition: "A vehicle for transportation via roads"},
	{id: 2, word: "train", definition: "A method of transportation using rails"}
];

app.get("/", function (req, res){
	res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.get("/phrases", function(req, res){
	console.log(__dirname);
	res.send(JSON.stringify(phrases));
});

app.listen(3000, function (){
  console.log("listening on port 3000");
});