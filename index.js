var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./App/DB');
var index = require('./App/Routes/index');
var employees = require('./App/Routes/employees');
var app = express();

app.set('views', path.join(__dirname, 'App/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/employees', employees);
app.listen(3000, function() {
	console.log('Server running at port 3000: http://127.0.0.1:3000')
})