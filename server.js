var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var app = express();

//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.engine('ejs',engine);
app.set('view engine','ejs');


app.post('/createUser',function(req, res, next)
{
    var user = new User();
    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save(function(err){
         if (err){
           return next(err);
         }
         res.json('Sucessfully created a new user');
    });
});

app.get('/', function(req, res)
{
  res.render('home');
});


mongoose.connect('mongodb://root:hemanth@ds059145.mongolab.com:59145/ecommerce457',function(err){

  if (err){
    console.log(err);
  } else {
    console.log('Connected to the database');
  }

});


app.listen(3000, function(err)
{
     if (err) throw err;

     console.log('server is running on port 3000');
});
