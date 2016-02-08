var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var schema = mongoose.Schema;

//defining the characteristics or properties of the users
var UserSchema = new schema({
  email : {type : String, unique : true, lowercase : true},
  password : String,

  profile : {
    name : {type: String, default : ''},
    picture : {type: String, default : ''}
  },

  address : String,

  history:[
       {date : Date,
       paid : {type: Number, default : 0}}
  ]

});


//hashing the password
UserSchema.pre('save', function(next){
  var user = this;
  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt){
    if (err) return next(err);
  bcrypt.hash(user.password,salt,null, function(err, hash){
    if (err) return next(err);
    user.password =hash;
    next();
  });
  });

});
//Compare password in the database and the one user type in

UserSchema.methods.comparePassword = function(password)
{
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
