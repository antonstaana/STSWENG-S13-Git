const mongoose = require('mongoose');
const restaurant_model = require('../models/restaurants');
const product_model = require('../models/products');

exports.get_userResto = function(req,res){
    if(req.session.user){
        product_model.find_menu(req.session.model.menu, function(menu) {
                res.render('restaurant_profile',{
                    restaurant_name: req.session.model.displayname,
                    restaurant_category: req.session.model.category,
                    restaurant_location: req.session.model.location,
                    restaurant_contactno: req.session.model.contactno,
                    usertype: req.session.usertype,
                    menu: menu,
                    logged_in:true,
                });
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
    restaurant_model.get_One({_id:id}, function (restaurant) {
        product_model.find_menu(restaurant.menu, function(menu) {
            res.render('restaurant_profile', {
                title: 'LocalEats - Restaurant',
                usertype: req.session.usertype,
                logged_in: loggedin,
                restaurant,
                menu:menu
            })

     });

    });
}

exports.get_edit_menu = function(req,res){

    if(!req.session.changesStatus){
        req.session.changes = req.session.model;
        req.session.changesArr = [];
        
    }
    console.log(req.session.changes);
    req.session.changesStatus = false;

    product_model.find_menu(req.session.changes.menu, function(menu) {
        res.render('restaurant/edit_menu', {
            usertype: req.session.usertype,
            name: req.session.changes.displayname,
            temp_items:req.session.changesArr,
            menu: menu
        })
});

}


exports.addProduct = function(req, res){
    const product = {
        name: req.body.name,
        category: req.body.category,
        desc: req.body.desc,
        price: req.body.price,
        img:undefined
    };
    req.session.changesStatus = true;
    req.session.changesArr.push(product);   
   // console.log(req.session.changes);
    res.send({status: 200});
}

exports.saveChanges = function(req,res){
    var restaurant = req.session.changes;
    var new_items = req.session.changesArr;
    req.session.changes = null;
    req.session.changesArr = null;
    restaurant_model.edit_menu(restaurant, new_items, function(resu) {
        req.session.model = resu;
        console.log(resu);
        res.send({status:200});
    });
}