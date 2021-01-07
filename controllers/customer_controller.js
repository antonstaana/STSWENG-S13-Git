const bcrypt = require('bcrypt');
const userModel = require('../models/users');
const customerModel = require('../models/customers');
const {validationResult} = require('express-validator');

exports.get_customer_profile = (req, res, next) =>{
    if(req.session.usertype == 'customer'){
      //console.log(req.session);
        res.render('customer/profile', {
            customer_name: req.session.model.displayname,
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