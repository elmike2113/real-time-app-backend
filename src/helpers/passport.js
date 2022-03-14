const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');


module.exports = function(passport){
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
  opts.secretOrKey = "SOME_KEY";
  passport.use("user",new JwtStrategy(opts,function(jwt_payload,done){
    
    User.findOne({_id : jwt_payload._id},function(error,user){
      if(error){
        return done(err,false);
      }
      if(user){
        done(null,user);
      }else{
        done(null, false);
      }
    });
}))

};
