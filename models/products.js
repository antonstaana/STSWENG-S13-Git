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
    //category: {type:String, required: true},
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

/*productSchema.create = function(obj, next) {
    const product = new productModel(obj);

    product.save(function);
}

module.exports = 
*/
