const mongoose = require('./connection');

const ratingSchema = new mongoose.Schema({
    customerID: {type:String, required: true}, //Might Change to mongoose-generated ID https://mongoosejs.com/docs/schematypes.html
    restaurantID: {type:String, required: true}, //Might change to mongoose-generated ID https://mongoosejs.com/docs/schematypes.html
    ratingVal : {type:Number, required: true},
    ratingDesc : {type:String}
},{
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        }
});

module.exports = mongoose.model('ratings', ratingSchema);
