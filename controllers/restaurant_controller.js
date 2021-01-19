const mongoose = require('mongoose');
const restaurant_model = require('../models/restaurants');
const product_model = require('../models/products');
const e = require('express');
const { timeout } = require('async');

/*
Get Restaurant Profile of restaurant user
*/
exports.get_userResto = function(req,res){
    if(req.session.user){
        product_model.find_menu(req.session.model.menu, function(menu) {
                res.render('restaurant_profile',{
                    usertype: req.session.usertype,
                    restaurant: req.session.model,
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
/*
Get Edit Menu Page
 */
exports.get_edit_menu = function(req,res){

    if(!req.session.changesStatus){
        req.session.changes = req.session.model;
        req.session.changesArr = [];
        
    }
    console.log("Resto Controller editMenu: ");
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
/*
Get Edit Profile Change
*/
exports.get_edit_profile = function(req,res){


    res.render('restaurant/edit_profile',{
        usertype: req.session.usertype,
        //name: req.session.model.displayname
    })
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

exports.update_profile = function(req, res){
   // console.log("R Controllwer : update_profile")
    //console.log(req.body);
    restaurant_model.update_profile(req.session.model._id, req.body, function(result){
        req.session.model=result;
    return res.send({status:200});
    });
}

exports.saveChanges = function(req,res){
    const restaurant = req.session.changes;
    const new_items = req.session.changesArr;
    req.session.changes = null;
    req.session.changesArr = null;
     restaurant_model.edit_menu(restaurant, new_items, function(resu) {
        req.session.model = resu;
        //console.log("Restaurant Controller resu:  "+resu);
       return res.send({status:200});
    });
}