const mongoose = require('./connection');
const products = require('./products');
const orders = require('./orders');
const ratings = require('./ratings');
const customerModel = require('./customers');

const restaurantSchema = new mongoose.Schema({
    uID : {type:String},
    email : {type:String, required: true}, //validation important
    password : {type:String, required: true}, //validation important
    username :{type:String, required: true},
    displayname :{type:String, required: true},
    bio :{type:String},
    category :{type:String},
    storehours :{type:String}, //Reconsider Handling
    location :{type:String}, //handle with dropdown
    contactno :{type:Number}, //Reconsider Handling
    img : {
        data: Buffer,
        contentType: String
    },
    availability: {type:Boolean},
    menu: [{type: mongoose.Schema.Types.ObjectId, ref: "products"}], //https://mongoosejs.com/docs/2.7.x/docs/embedded-documents.html
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: "orders"}],
    ratings: [{type: mongoose.Schema.Types.ObjectId, ref: "ratings"}]
},{
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        }
});


const restaurantModel = mongoose.model('restaurants', restaurantSchema);



restaurantModel.create = function(obj, next) {
    const restaurant = new restaurantModel(obj);
    console.log("Restaurant Model");
    console.log(restaurant);

    restaurant.save(function(err, restaurant){
        next(err, restaurant);
    });
};

restaurantModel.getOne = function(query, next){
    restaurantModel.findOne(query, function(err, restaurant) {
        next(err, restaurant);
    });
};

module.exports = restaurantModel;