var express = require('express'); 
var bodyParser = require('body-parser'); 
var logger = require('morgan'); 
var mongoose = require('mongoose'); 

//	Require Article Schema
var Article =  require('./models/Article.js'); 

//	Express instance 
var app = express(); 
var PORT = process.env.PORT || 3000; 

//	Morgan to log 
app.(logger('dev')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.text()); 
app.use(bodyParser.json({type: 'application/vnd.api+json'})); 

app.use(express.static('./public')); 

//+++++++++++++++++++++++++++++++++++++++++++++++++++

//	MongoDB config
mongoose.connect('mongodb://localhost/nytDB');
var db = mongoose.connection; 

db.on('error', function (err){
	console.log('Mongoose Error: ', err); 
});

db.once('open', function() {
	console.log('Mongoose connection succesful!'); 
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++

//	Main route setup that redirects to rendered React app
app.get('/', function(req, res){
	res.sendFile('./public/index.html'); 
}); 

//+++++ Send GET requests & calls this route on page render
app.get('/api/', function(req, res){
	console.log("IT'S THE API ROUTE"); 
});

app.post('/api/', function(req, res){
	var newSearch = new Article(req.body); 
	//console.log("BODY: " + req.body.location)??
});

app.listen(PORT, function(){
	console.log("App listening on PORT: " + PORT); 
}); 

