const mongoose = require('./connection');

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
    },
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

module.exports = mongoose.model('customers', customerSchema);
