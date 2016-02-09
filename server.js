var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');


mongoose.connect('mongodb://root:hemanth@ds059145.mongolab.com:59145/ecommerce457',function(err){

  if (err){
    console.log(err);
  } else {
    console.log('Connected to the database');
  }

});



//MIDDLEWARE

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.engine('ejs',engine);
app.set('view engine','ejs');
app.use(cookieParser());
app.use(session({
  resave : true,
  saveUninitialized: true,
  secret : 'H34FSD$W$#@@#'
}));

app.use(flash());


var mainRoutes  = require('./routes/main');
app.use(mainRoutes);
var userRoutes = require('./routes/user');
app.use(userRoutes);




app.listen(3000, function(err)
{
     if (err) throw err;

     console.log('server is running on port 3000');
});
