const mongoose = require('./connection');
const orders = require('./orders');
const ratings = require('./ratings');

const customerSchema = new mongoose.Schema({
    uID : {type:String},
    email : {type:String, required: true},
    password : {type:String, required: true},
    username :{type:String}, //Fname
    displayname :{type:String}, //:Lname
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
 /* console.log("Customer Model");
  console.log(customer);*/

  customer.save(function(err, customer) {
    next(err, customer);
  });
};

customerModel.getOne = function(query, next) {
  customerModel.findOne(query, function(err, customer) {
    next(err, customer);
  });
};


customerModel.update_profile = function(custo_id, new_details, callback) {
  customerModel.findByIdAndUpdate(custo_id, {$set:{displayname:new_details.displayname, username:new_details.username, location:new_details.location, contactno:new_details.contact}},
      {new:true, useFindAndModify: false, overwrite:true}, function(err, result) {
      if(err)
      { 
        console.log("here") ;
        console.log(err);
        console.log("end");
      };
      callback(result);
  }); 
}


module.exports = customerModel;
