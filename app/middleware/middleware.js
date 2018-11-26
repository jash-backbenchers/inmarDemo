var jwt=require('jsonwebtoken');
var config=require('../../config');
var secreteKey=config.secreteKey;
var User = require('../models/user')

module.exports.createToken =function(user) {
	var token=jwt.sign({
		_id:user._id,
		first_name: user.first_name,
		last_name: user.last_name,
		mobile: user.mobile,
		email: user.email,
		username: user.username,
	},secreteKey,{expiresIn:'10h'});
	
	return token;
}

module.exports.requireLogin = function(req, res, next) {
	var token=req.body.token || req.params.token || req.headers['x-access-token']
	if(token)
	{
		jwt.verify(token,secreteKey,function(err,decoded) {
			if(err)
			{
				res.status(403).send({success:false,message:"unable to authenticate "});
			}
			else
			{
				req.decoded=decoded;
				next();
			}
		})
	}
	else
	{
		res.status(403).send({success:false,message:"no token provided "});
	}
 }

 module.exports.requireAuthorisation=function(req,res,next) {
	User.findById(req.params.id,function(err,user) {
		if(err)
			res.status(404).send({success:false,message:"not found"});
		else
		{
			console.log(user);
			if(req.decoded._id == user._id)
				next();
			else
				res.status(403).send({success:false,message:"access denied"})
		}
	})
}