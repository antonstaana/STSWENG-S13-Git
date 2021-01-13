const mongoose = require('mongoose');
const restaurant_model = require('../models/restaurants');

exports.get_userResto = function(req,res){
    if(req.session.user){
        console.log(req.session);
        res.render('restaurant_profile',{
            restaurant_name: req.session.model.displayname,
            restaurant_category: req.session.model.category,
            restaurant_location: req.session.model.location,
            restaurant_contactno: req.session.model.contactno,
            usertype: req.session.usertype,
            logged_in:true,
        });
    }
    else{
        res.redirect('/');
    }
};

exports.get_restaurant_profile = function(req,res){
    var id= req.params.restaurantId
    var loggedin;
    if(req.session.usertype == 'customer'){
        loggedin = true
    }

    restaurant_model.getOne({_id:id}, function (restaurant) {
        res.render('restaurant_profile', {
            title: 'LocalEats - Restaurant',
            usertype: req.session.usertype,
            logged_in: loggedin,
            restaurant
        })
    });
}

/*exports.addProduct = function(req, res){
    var product = {
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price
    }
}*/
