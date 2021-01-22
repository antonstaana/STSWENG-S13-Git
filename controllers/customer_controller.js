const bcrypt = require('bcrypt');
const userModel = require('../models/users');
const customerModel = require('../models/customers');
const {validationResult} = require('express-validator');
const { get_edit_profile } = require('./restaurant_controller');

exports.get_customer_profile = (req, res, next) =>{
    if(req.session.usertype == 'customer'){
      //console.log(req.session);
        res.render('customer/profile', {
            customer_name: req.session.model.username + " "+  req.session.model.displayname,
            customer_address: req.session.model.location,
            customer_contact: req.session.model.contactno,
            customer_email: req.session.model.email,
            usertype: req.session.usertype,
            logged_in:true,
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
  res.render('customer/edit_profile', {
    usertype:req.session.usertype,
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