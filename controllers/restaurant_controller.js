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
        product_model.find_menu(req.session.model.menu,  function(menu) {
            var contact = req.session.model.contactno.toString();
            if(contact.length < 11){
                while(contact.length <11){
                    contact = "0" + contact;
                }
            }
                res.render('restaurant_profile',{
                    usertype: req.session.usertype,
                    restaurant: req.session.model,
                    contactno: contact, 
                    own: true,
                    menu: menu,
                    logged_in:true,
                    title:req.session.model.displayname + " - LocalEats"
                });
        });
    }
    else{
        res.redirect('/');
    }
};

exports.get_restaurant_profile = function(req,res){
    const id= req.params.restaurantId
    var own = false;
    if(req.session.usertype == 'restaurant' ){
        res.redirect('/');
    }
    else if(req.session.usertype == 'customer'){
        restaurant_model.get_One({_id:id}, function (restaurant) {
            product_model.find_menu(restaurant.menu, function(menu) {
                var contact = restaurant.contactno.toString();
                if(contact.length < 11){
                    while(contact.length <11){
                        contact = "0" + contact;
                    }
                }
                res.render('restaurant_profile', {
                    title: 'LocalEats - Restaurant',
                    usertype: req.session.usertype,
                    own: own ,
                    restaurant,
                    contactno:contact,
                    menu:menu,
                    title:restaurant.displayname+ " - LocalEats"
                })

            });
        });
    }else{
        res.redirect('/');
    }
}
/*
Get Edit Menu Page
 */
exports.get_edit_menu = function(req,res){

    if(!req.session.changesStatus){
        req.session.changes = req.session.model;
        req.session.changesArr = [];
        req.session.changesArrDels = []
    }
   // console.log("Resto Controller editMenu: ");
    //console.log(req.session.changes);
    req.session.changesStatus = false;

    product_model.find_menu(req.session.changes.menu,   function(menu) {
        res.render('restaurant/edit_menu', {
            usertype: req.session.usertype,
            name: req.session.changes.displayname,
            temp_items:req.session.changesArr,
            temp_del_items:req.session.changesArrDels,
            menu: menu,
            title: "Edit Menu - LocalEats"

        })
});

}
/*
Get Edit Profile Change
*/
exports.get_edit_profile = function(req,res){

    console.log(req.session.model);
    res.render('restaurant/edit_profile',{
        usertype: req.session.usertype,
        name: req.session.model.displayname,
        restaurant: req.session.model,
        title: "Edit Profile - LocalEats"
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

exports.removeProduct = function(req, res){
    product_model.get_One({_id : req.body.id},function(del_item){
        req.session.changesStatus = true;
        req.session.changesArrDels.push(del_item);
        req.session.changes.menu = req.session.changes.menu.filter(function (item) {return item !== req.body.id ;});
        return res.send({status:200});
    })

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
    const del_items = req.session.changesArrDels;
    req.session.changes = null;
    req.session.changesArr = null;
    req.session.changesArrDels = null;

     restaurant_model.edit_menu(restaurant, new_items, del_items, function(resu) {
        req.session.model = resu;
        //console.log("Restaurant Controller resu:  "+resu);
       return res.send({status:200});
    });
}