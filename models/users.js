const mongoose = require('./connection');
const products = require('./products');
const orders = require('./orders');
const ratings = require('./ratings');

const userSchema = new mongoose.Schema({
    usertype: {type:String, required: true}, //customer, restaurant
    email : {type:String, required: true},
    password : {type:String, required: true},
    username :{type:String},
    displayname :{type:String},
    bio :{type:String},
    category :{type:String}, //restaurants
    storehours :{type:String}, //restaurants
    //location
    street: {type:String},
    city_province: {type:String},
    contactno :{type:Number},
    /*
    img : {
        data: Buffer,
        contentType: String
    },
    */
    img: {type:String},
    availability: {type:Boolean}, //restaurants
    menu: [{type: mongoose.Schema.Types.ObjectId, ref: "products"}], //restaurants
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

const userModel = mongoose.model('users', userSchema);

userModel.create = function(obj, next) {
  const user = new userModel(obj);



  user.save(function(err, user) {
    next(err, user);
  });
};

userModel.getOne = function(query, next) {
  userModel.findOne(query, function(err, user) {
    next(err, user);
  });
};


module.exports = mongoose.model('users', userSchema);
