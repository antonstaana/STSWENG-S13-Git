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
    username :{type:String},  //REMOVE
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

restaurantModel.update_profile = function(resto_id, new_details, callback) {

    restaurantModel.findByIdAndUpdate(resto_id, {$set:{displayname:new_details.name, bio:new_details.desc, category:new_details.category,
                                                storehours:new_details.storehours, location:new_details.location, contactno:new_details.contact}},
        {new:true, useFindAndModify: false, overwrite:true}, function(err, result) {
        if(err) throw err;
        callback(result);
    }); 
}
/*
Save Changes to menu
resto_data - The restaurant obj to be changed
new_items - Array of products to be added   

*/
restaurantModel.edit_menu = function(resto_data, new_items, del_items, callback){ 
    var restaurant = new restaurantModel(resto_data);
    var new_itemsdata = new_items;
    var new_products = [];
    var del_itemId = []
    
    del_items.forEach(function(item) {
        del_itemId.push(item._id);
    })

        restaurantModel.findByIdAndUpdate(restaurant.id, {$set:{menu:restaurant.menu}},{new:true, useFindAndModify: false, overwrite:true}, function(err, result) {
    
             if(del_items.length > 0){
              products_model.deleteMany({_id: {$in:del_itemId}}, function(err){});
            }
            if(new_itemsdata.length > 0){
                new_itemsdata.forEach(function(new_item, index, array) { 
                    products_model.create(new_item, function(err, item){
                        if(err){
                            callback("Could not create product");
                        }
                        else{
                            new_products.push(item);  
                            if (index === (array.length -1)) {
                                // This is the last one.
                                new_products.forEach(function(new_product, index, array) {
                                    restaurantModel.findByIdAndUpdate(restaurant.id, {$push:{'menu':new_product}},{new:true, useFindAndModify: false, overwrite:true}, function(err, result) {
                                        if(err) callback("ERR");
                                        else{
                                            if (index === (array.length -1)){
                                                callback(result);      
                                            }
                                        }
                                    }); 
                                })
                            }
                    
                        }
                    })
                })
            }
            else{
                callback(result);
            }
        }); 



}

module.exports = restaurantModel;