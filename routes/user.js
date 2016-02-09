var router = require('express').Router();
var User  =require('../models/user');


router.get('/signup', function(req, res, next )
{
   res.render('accounts/signup',{
       errors : req.flash('errors')
   } );
} );


router.post('/signup',function(req, res, next)
{
    var user = new User();
    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    User.findOne({email : req.body.email}, function(err, existingUser){

      if (existingUser) {
        req.flash('errors','A user with that email already exists');
        //console.log(req.body.email + 'already exists');
        res.redirect('/signup');
    }else {
      user.save(function(err, user){
        if (err) return next(err);
        res.redirect('/');
      });
    }
  });

    user.save(function(err){
         if (err){
           return next(err);
         }
         res.json('Sucessfully created a new user');
    });
});

module.exports =router;
