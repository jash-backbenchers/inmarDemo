
var express=require('express');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var fs=require('fs'); 
var config=require('./config');
var mongoose=require('mongoose');
var multer = require('multer');


var api=require('./app/routes/api')(app,express);
var apiproduct=require('./app/routes/api.product')(app,express);
var apiuser=require('./app/routes/api.user')(app,express);
var apiauthentication=require('./app/routes/api.authentication')(app,express);
var app=express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , x-access-token");
	next();
});

mongoose.connect(config.database,function(err) {
	if(err)
		console.log(err);
	else
	console.log('connected to database');
});

var http=require('http').Server(app);
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


app.use('/', express.static(__dirname + "/public/dist"));

app.use(morgan('dev'));

app.use('/api/v1',api);
app.use('/api/v1/product',apiproduct);
app.use('/api/v1/user',apiuser);
app.use('/api/v1/authentication',apiauthentication);

app.get('*',function(req,res,next) {
	res.sendFile(__dirname+"/public/dist/index.html");
});


http.listen(config.port);
console.log('listening on port ',config.port);