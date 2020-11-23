const mongoose = require('./connection');

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
    menu: [productSchema], //https://mongoosejs.com/docs/2.7.x/docs/embedded-documents.html
    orders: [orderSchema],
    ratings: [ratingSchema]
},{
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        }
});

module.exports = mongoose.model('restaurants', restaurantSchema);
