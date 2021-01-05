const mongoose = require('mongoose');

exports.get_landing = function(req,res){
    res.render('landing', {
    });

}

exports.get_about = function(req,res){
    res.render('static/about', {
        title:'LocalEats - About'
    });

}

exports.get_contacts = function(req,res){
    res.render('static/contacts', {

    });

}

exports.get_privacy = function(req,res){
    res.render('static/privacy', {

    });

}

exports.get_terms = function(req,res){
    res.render('static/terms', {

    });

}

exports.get_restaurant_registration = function(req,res){
    res.render('restaurant_registration', {

    });

}

exports.get_restaurant_profile = function(req,res){
    res.render('restaurant_profile', {

    });

}

exports.get_search = function(req,res){
    res.render('search', {

    });

}

exports.get_customer_profile = function(req,res){
    res.render('customer/profile', {
    });

}