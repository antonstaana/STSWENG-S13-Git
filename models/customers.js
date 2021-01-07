const mongoose = require('./connection');
const orders = require('./orders');
const ratings = require('./ratings');

const customerSchema = new mongoose.Schema({
    uID : {type:String},
    email : {type:String, required: true},
    password : {type:String, required: true},
    username :{type:String},
    displayname :{type:String},
    bio :{type:String},
    location :{type:String},
    contactno :{type:Number},
    img : {
        data: Buffer,
        contentType: String
    },
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

const customerModel = mongoose.model('customers', customerSchema);

customerModel.create = function(obj, next) {
  const customer = new customerModel(obj);
  console.log("Customer Model");
  console.log(customer);

  customer.save(function(err, customer) {
    next(err, customer);
  });
};

customerModel.getOne = function(query, next) {
  customerModel.findOne(query, function(err, customer) {
    next(err, customer);
  });
};


module.exports = customerModel;
