var mongoose=require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var Schema=mongoose.Schema;

var productSchema=new Schema(
{
	sku:{type:String,required:true,unique:true},
	location:{type: String},
	department:{type:String},
	category:{type:String},
	subcategory:{type:String},
	name:{type: String}
});

productSchema.plugin(mongoosePaginate);

var Product=mongoose.model('Product', productSchema);

module.exports=Product;