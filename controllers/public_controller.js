const mongoose = require('mongoose');
const restaurant_model = require('../models/restaurants');

exports.get_landing = function(req,res){
    if(req.session.usertype){
        var page = "landing"
        if(req.session.usertype == "customer")
            page = "home";
        restaurant_model.get_all({}, function (restaurant_list){
            res.render(page, {
                title: 'LocalEats',
                usertype: req.session.usertype,
                logged_in:true,
                restaurant_list
            });
        });
    }
    else {
        restaurant_model.get_all({}, function (restaurant_list){
            res.render('landing', {
                title: 'LocalEats',
                restaurant_list
            });
        });
    }       
}


//Static Pages
exports.get_about = function(req,res){
    if(req.session.usertype){
        res.render('static/about', {
            usertype: req.session.usertype,
            logged_in:true,
            title:"About - LocalEats"
        });
    }
    else {
        res.render('static/about', {
            title:"About - LocalEats"
        });
    }      
}

exports.get_contacts = function(req,res){
    if(req.session.usertype){
        res.render('static/contacts', {
            usertype: req.session.usertype,
            logged_in:true,
            title:"Contacts - LocalEats"
        });
    } 
    else {
        res.render('static/contacts', {
            title:"Contacts - LocalEats"
        });
    }      
}

exports.get_privacy = function(req,res){
    if(req.session.usertype){
        res.render('static/privacy', {
            usertype: req.session.usertype,
            logged_in:true,
            title:"Privacy Policy - LocalEats"
        });
    }
    else {
        res.render('static/privacy', {
            title:"Privacy Policy - LocalEats"

        });
    }      
}

exports.get_terms = function(req,res){
    if(req.session.usertype){
        res.render('static/terms', {
            usertype: req.session.usertype,
            logged_in:true,
            title:"Terms - LocalEats"

        });
    }
    else {
        res.render('static/terms', {
            title:"Terms - LocalEats"

        });
    }      
}
//End of Static Pages

exports.get_restaurant_registration = function(req,res){
    res.render('restaurant_registration', {
        title:"Restaurant Registration - LocalEats"
    });

}

exports.get_restaurant_profile = function(req,res){
    if(req.session.usertype){
        if(req.session.usertype == 'restaurant'){
            res.render('restaurant_profile', {
            title:"LocalEats"

            });
        }
        else{
            res.render('restaurant_profile', {
                usertype: req.session.usertype,
                logged_in:true,
                title:"LocalEats"
            });
        }   
    } 
    else {
        res.render('restaurant_profile', {
            title:"LocalEats"
        });
    }      
}

exports.get_search = function(req,res){
    if(req.session.usertype){
        res.render('search', {
            usertype: req.session.usertype,
            logged_in:true,
        });
    }
    else {
        res.render('search', {
        });
    }      

}
