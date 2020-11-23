const mongoose = require('./connection');

const orderSchema = new mongoose.Schema({
    customerID: {type:String, required: true}, //Might Change to mongoose-generated ID https://mongoosejs.com/docs/schematypes.html
    restaurantID: {type:String, required: true}, //Might change to mongoose-generated ID https://mongoosejs.com/docs/schematypes.html
    cart: [productSchema]
},{
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        }
});

module.exports = mongoose.model('orders', orderSchema);
