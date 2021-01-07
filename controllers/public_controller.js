const mongoose = require('mongoose');
/*
    if(req.session.usertype == 'customer'){
        res.render('landing', {
            usertype: req.session.usertype,
        });
    } else if (req.session.usertype == 'restaurant'){
        res.render('landing', {
            restaurant_user:true,
        });
    }
    else {
        res.render('landing', {
        });
    }      
*/
/*
exports.get_landing = function(req,res){
    if(req.session.usertype == 'customer'){
        res.render('landing', {
            usertype: req.session.usertype,
            logged_in:true,
        });
    } else if (req.session.usertype == 'restaurant'){
        res.render('landing', {
            restaurant_user:true,
            logged_in:true,
        });
    }
    else {
        res.render('landing', {
        });
    }       
}*/

exports.get_landing = function(req,res){
    if(req.session.usertype){
        res.render('landing', {
            usertype: req.session.usertype,
            logged_in:true,
        });
    }
    else {
        res.render('landing', {
        });
    }       
}

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
