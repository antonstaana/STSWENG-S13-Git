const mongoose = require('mongoose');

exports.get_landing = function(req,res){
    res.render('landing', {

    });

}

exports.get_about = function(req,res){
    res.render('about', {

    });

}

exports.get_contacts = function(req,res){
    res.render('contacts', {

    });

}

exports.get_privacy = function(req,res){
    res.render('privacy', {

    });

}

exports.get_terms = function(req,res){
    res.render('terms', {

    });

}