const mongoose = require('mongoose');

exports.get_userResto = function(req,res){
    res.render('restaurant_profile', {
            restaurant_user:true
    });

}
