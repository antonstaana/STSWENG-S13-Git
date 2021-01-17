const mongoose = require('./connection');
mongoose.set('useFindAndModify', false);
const products_model = require('./products');
const orders = require('./orders');
const ratings = require('./ratings');
const { nextTick } = require('async');

const restaurantSchema = new mongoose.Schema({
    uID : {type:String},
    email : {type:String, required: true}, //validation important
    password : {type:String, required: true}, //validation important
    username :{type:String, required: true},
    displayname :{type:String, required: true}, //Restaurant name
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

restaurantModel.get_One = function(query, callback){
    restaurantModel.findOne(query, function(err, restaurant) {
        if(err) throw err;
        callback(restaurant.toObject());
    });
};

restaurantModel.getOne = function(query, next){
    restaurantModel.findOne(query, function(err, restaurant) {
        next(err, restaurant);
    });
};


restaurantModel.get_all = function(query, callback){
    restaurantModel.find(query, function(err, restaurants) {
        if(err) throw err;
        var restaurant_objects = [];

        restaurants.forEach(function(restaurant) {
            restaurant_objects.push(restaurant.toObject());
        });

        callback(restaurant_objects);
    });
}

restaurantModel.edit_restaurant = function(resto_data, callback) {
    var restaurant = new restaurantModel(resto_data);
    restaurantModel.findByIdAndUpdate(restaurant.id, {$set:{username:'Chad'}},{new:true, useFindAndModify: false, overwrite:true}, function(err, result) {
        if(err) throw err;
        callback(result);
    }); 
    /*restaurantModel.findOne({_id:restaurant.id}, function(err, restaurant) {
        if(err) throw err;
        callback(restaurant.toObject());
    });*/
}

restaurantModel.edit_menu = function(resto_data, new_items, callback){
    var restaurant = new restaurantModel(resto_data);
    var new_items = new_items;
    new_items.forEach(function(new_item) { 
        products_model.create(new_item, function(err, item){
            if(err){
                callback("Could not create product");
            }
            else{
                restaurantModel.findByIdAndUpdate(restaurant.id, {$push:{'menu':item}},{new:true, useFindAndModify: false, overwrite:true}, function(err, result) {
                    if(err) throw err;
                    callback(result);
                }); 
            }

        })
    })
}

module.exports = restaurantModel;