const mongoose = require('mongoose');
const restaurant_model = require('../models/restaurants');

exports.get_landing = function(req,res){
    if(req.session.usertype){
        restaurant_model.get_all({}, function (restaurant_list){
            res.render('landing', {
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
        });
    }
    else {
        res.render('static/about', {
        });
    }      
}

exports.get_contacts = function(req,res){
    if(req.session.usertype){
        res.render('static/contacts', {
            usertype: req.session.usertype,
            logged_in:true,
        });
    } 
    else {
        res.render('static/contacts', {
        });
    }      
}

exports.get_privacy = function(req,res){
    if(req.session.usertype){
        res.render('static/privacy', {
            usertype: req.session.usertype,
            logged_in:true,
        });
    }
    else {
        res.render('static/privacy', {
        });
    }      
}

exports.get_terms = function(req,res){
    if(req.session.usertype){
        res.render('static/terms', {
            usertype: req.session.usertype,
            logged_in:true,
        });
    }
    else {
        res.render('static/terms', {
        });
    }      
}
//End of Static Pages

exports.get_restaurant_registration = function(req,res){
    res.render('restaurant_registration', {

    });

}

exports.get_restaurant_profile = function(req,res){
    if(req.session.usertype){
        if(req.session.usertype == 'restaurant'){
            res.render('restaurant_profile', {
            });
        }
        else{
            res.render('restaurant_profile', {
                usertype: req.session.usertype,
                logged_in:true,
            });
        }   
    } 
    else {
        res.render('restaurant_profile', {
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
