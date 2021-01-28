const bcrypt = require('bcrypt');
const userModel = require('../models/users');
const customerModel = require('../models/customers');
const {validationResult} = require('express-validator');
const { get_edit_profile } = require('./restaurant_controller');

exports.get_customer_profile = (req, res, next) =>{


    if(req.session.usertype == 'customer'){
      //console.log(req.session);
      if(req.session.model.location ==', '){
        var location = "N/A";
      }
      else {
        var location = req.session.model.location
      }
      var contact = req.session.model.contactno;
      if(contact.length < 11){
        while(contact.length <11){
            contact = "0" + contact;
        }
      } 
      
      res.render('customer/profile', {
          customer_name: req.session.model.username + " "+  req.session.model.displayname,
          customer_address: location,
          customer_contact:contact,
          customer_email: req.session.model.email,
          usertype: req.session.usertype,
          logged_in:true,
          title: req.session.model.username + " - Profile"  
      });
    }
    else{
      res.redirect('/');
    }
  };
/*
Get Edit Profile Page
*/
exports.get_edit_profile = function(req,res){
  var locEmpty;
  if(req.session.model.location == ", "){
    locEmpty = true;
  }
  res.render('customer/edit_profile', {
    customer:req.session.model,
    locatEmpty: locEmpty,
    usertype:req.session.usertype,
    title: req.session.model.username + " - Profile"  
  })
}
/*
Update Profile
*/
exports.update_profile = function(req, res){
   customerModel.update_profile(req.session.model._id, req.body, function(result){
       req.session.model=result;
       return res.send({status:200});
   });
}