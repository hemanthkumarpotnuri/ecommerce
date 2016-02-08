var express = require('express');
var morgan = require('morgan');


var app = express();

//MIDDLEWARE

app.use(morgan('dev'));

app.listen(3000, function(err)
{
     if (err) throw err;

     console.log('server is running on port 3000');
});


app.get('/', function(req,res){
         var name ='Hemanth';
         res.json("My name is "+ name);
});
