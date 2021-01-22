const mongoose = require('./connection');
const products = require('./products');

const ItemSchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, ref: "products"},
    quantity: {type: Number, required: true, min: [1, 'Quantity can not be less then 1.']},
    price: {type: Number, required: true},
    total: {type: Number, required: true,}
}, {
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        }
});

const orderSchema = new mongoose.Schema({
    customerID: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
    restaurantID: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
    cart: [ItemSchema],
    subTotal: { default: 0, type: Number}
},{
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        }
});

module.exports = mongoose.model('orders', orderSchema);
