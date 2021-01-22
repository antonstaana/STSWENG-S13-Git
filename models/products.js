const { forEach } = require('async');
const mongoose = require('./connection');

const productSchema = new mongoose.Schema({
    name : {type:String, required: true},
    desc :{type:String, required: true},
    price : {type:Number, required: true},
    img : {
        data: Buffer,
        contentType: String
    },
    //stock: {type:Number, required: true},
    category: {type:String, required: true},
    //availability: {type:Boolean, required: true}
},{
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        }
});

const productModel = mongoose.model('products', productSchema);

productModel.create = function(obj, next) {
    const product = new productModel(obj);

    product.save(function(err, product){
        next(err,product);
    });
};

productModel.get_One = function(query, callback){
    productModel.findOne(query, function(err, item) {
        if(err) throw err;
        callback(item.toObject());
    });
};

productModel.find_menu = function(item_id,  callback){

    var list = []
    item_id.forEach(function(item) {
        list.push(mongoose.Types.ObjectId(item));
    })
    productModel.find({_id: {$in: list}},null, {sort:{category:1, name:1}}, function(err,menu) {  //sort by Category then by ASCII value
        var menu_objects = [];
        menu.forEach(function(product) {
            menu_objects.push(product.toObject());
        });
        callback(menu_objects);
    });
}


module.exports = productModel

