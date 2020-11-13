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

const restaurantSchema = new mongoose.Schema({
    email : {type:String, required: true}, //validation important
    password : {type:String, required: true}, //validation important
    username :{type:String, required: true},
    displayname :{type:String, required: true},
    bio :{type:String, required: true},
    category :{type:String, required: true},
    storehours :{type:String, required: true}, //Reconsider Handling
    location :{type:String, required: true}, //handle with dropdown
    contactno :{type:Number, required: true}, //Reconsider Handling
    img : {
        data: Buffer,
        contentType: String
    },
    availability: {type:Boolean},
    menu: [productSchema] //https://mongoosejs.com/docs/2.7.x/docs/embedded-documents.html
},{
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        }
});

const customerSchema = new mongoose.Schema({
    email : {type:String, required: true},
    password : {type:String, required: true},
    username :{type:String, required: true},
    displayname :{type:String, required: true},
    bio :{type:String, required: true},
    location :{type:String, required: true},
    contactno :{type:Number, required: true},
    img : {
        data: Buffer,
        contentType: String
    }
},{
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        }
});

const orderSchema = new mongoose.Schema({
    customer: [customerSchema],
    restaurant: [restaurantSchema],
    cart: [productSchema]
},{
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        }
});

module.exports = mongoose.model('product', productSchema);
module.exports = mongoose.model('restaurant', restaurantSchema);
module.exports = mongoose.model('customer', customerSchema);
module.exports = mongoose.model('order', orderSchema);
