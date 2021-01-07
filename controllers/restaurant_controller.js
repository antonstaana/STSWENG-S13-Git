const mongoose = require('mongoose');

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
