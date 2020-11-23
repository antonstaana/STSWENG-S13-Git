const mongoose = require('./connection');

const productSchema = new mongoose.Schema({
    name : {type:String, required: true},
    desc :{type:String, required: true},
    price : {type:Number, required: true},
    img : {
        data: Buffer,
        contentType: String
    },
    stock: {type:Number, required: true},
    category: {type:String, required: true},
    availability: {type:Boolean, required: true}
},{
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        }
});

module.exports = mongoose.model('products', productSchema);
