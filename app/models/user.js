var mongoose=require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var bcrypt=require('bcryptjs');
var Schema=mongoose.Schema;

var userSchema=new Schema({ 
  first_name: {type: String,required:true},           
  last_name: {type: String,required:true},            
  mobile: {type: String,required:false},               
  email: {type: String,required:true,index:{unique:true}},                
	username: {type:String,required:true,index:{unique:true}},
	password: {type:String,required:true,select:false},
});

userSchema.pre('save',function(next) {
	var user=this;
	console.log('at pre');
	if(!user.isModified('password'))
		return next();
	var salt = bcrypt.genSaltSync(10);
 	var hash = bcrypt.hashSync(user.password, salt);
 	
 	user.password=hash;
	console.log(user.password);
	next();
});

userSchema.methods.comparePasswords=function(password) {
	employee=this;
	return bcrypt.compareSync(password,employee.password);
};
userSchema.plugin(mongoosePaginate);

var User=mongoose.model('User', userSchema);
module.exports=User;