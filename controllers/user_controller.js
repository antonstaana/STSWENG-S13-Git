const bcrypt = require('bcrypt');
const userModel = require('../models/users');
const customerModel = require('../models/customers');
const restaurantModel = require('../models/restaurants')
const {validationResult} = require('express-validator');

exports.register_customer = function(req,res){
/**/
  const errors = validationResult(req);

  if(errors.isEmpty()){
/**/
    const {email, username, password, password2, displayname, street, city_province, contactno} = req.body; //MISSING IMG

    userModel.getOne({email : email}, function(err, result){
      if(result){
        console.log("Email already used");
        req.flash('error_msg', 'Email already used');
        res.send({status: 401});
      } else {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, function(err, hashed){
          const newUser = {
              usertype: "customer",
              email: email,
              password: hashed,
              username: username,
              displayname: displayname,
              bio: undefined,
              category: null,
              storehours: null,
              street: street,
              city_province: city_province,
              contactno: contactno,
              img: undefined, //MISSING IMG
              availability: null,
              menu: null,
              orders: [],
              ratings: []
          };

          userModel.create(newUser, function(err, user){
            if(err){
              console.log(err);
              console.log("Could not create customer. Please Try Again!");
              req.flash('error_msg', 'Could not create customer. Please Try Again!');
              res.redirect('/');
            } else {
              //CREATE NEW CUSTOMER
              const newCustomer = {
                _id: user._id,
                uID : user._id,
                email : email,
                password:hashed,
                username: username,
                displayname: displayname,
                bio: undefined,
                location: street + ", " + city_province,
                contactno:contactno,
                img:undefined,
                orders: [],
                ratings: []
              };

              customerModel.create(newCustomer, function(err, user){
                if(err){
                  console.log(err);
                  console.log("Could not create customer. Please Try Again!");
                  req.flash('error_msg', 'Could not create customer. Please Try Again!');
                  res.redirect('/');
                }
                else{
                  req.session.user = user._id;
                  req.session.name = user.email;
                  req.session.model = newCustomer;
                  req.session.usertype = newUser.usertype;   
                  /*console.log("Model");
                  console.log(req.session.model._id);*/
                  console.log("You are now registered as a customer!")
                  req.flash("success_msg", 'You are now registered!');
                  res.send({status: 200});
                }
              })
            }
          })
        })
      }
    });
/**/
  } else {
    console.log(errors);
    const messages = errors.array().map((item) => item.msg);
    req.flash('error_msg', messages.join(' '));
  }
/**/
};

exports.register_restaurant = function(req,res){

  const errors = validationResult(req);
  console.log("Errors" + errors)

  if(errors.isEmpty()){
    const {email,  displayname, category, street, city_province, contactno, password, password2 , time} = req.body;  //MISSING IMG
    userModel.getOne({email : email}, function(err, result){
      if(result){
        console.log("Email already used");
        req.flash('error_msg', 'Email already used');
        res.send({status: 401});
      } else {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, function(err, hashed){
          const newUser = {
            usertype: "restaurant",
            email: email,
            password: hashed,
            username: null,
            displayname: displayname,
            bio: undefined,
            category: category,
            storehours: undefined,
            street: street,
            city_province: city_province,
            contactno: contactno,
            img: undefined, //NEED TO IMPLEMENT MULTER
            availability: undefined,
            menu: [],
            orders: [],
            ratings: []
          };

          userModel.create(newUser, function(err, user){
            if(err){
              console.log(err);
              console.log("Could not create restaurant. Please Try Again!");
              req.flash('error_msg', 'Could not create restaurant. Please Try Again!');
              res.redirect('/');
            } else {
            //CREATE NEW RESTAURANT
              const newRestaurant = {
                _id: user._id,
                uID: user._id,
                email: email,
                password: hashed,
                username: null,
                displayname: displayname,
                bio: undefined,
                category: category,
                storehours:time,
                location: street + ", " + city_province,
                contactno: contactno,
                img:undefined,
                availability: undefined,
                menu:[],
                orders: [],
                ratings:[]
              };
              
                restaurantModel.create(newRestaurant, function(err, user){
                    if (err){
                        console.log(err);
                        console.log("Could not create restaurant. Please Try Again!");
                        req.flash('error_msg', 'Could not create restaurant. Please Try Again!');
                        res.redirect('/');
                    }
                    else{
                        req.session.user = user._id;
                        req.session.name = user.email;
                        req.session.model = newRestaurant;
                        req.session.usertype = newUser.usertype;   
                        /*console.log("The Session");
                        console.log(req.session);*/
                        console.log("You are now registered as a restaurant!")
                        req.flash("success_msg", 'You are now registered!');
                        res.send({status: 200});
                    }
                })

            }
          })
        })
      }
    });
/**/
  } else {
      console.log(errors[0]);
    const messages = errors.array().map((item) => item.msg);
    req.flash('error_msg', messages.join(' '));
    //res.redirect('/');
  }
/**/
};

exports.login = function(req,res){
  const {email, password} = req.body;
  const errors = validationResult(req);
  console.log(errors);

  if(errors.isEmpty()){
    userModel.getOne({ email: email }, (err, user) => {
        if (err) {
        // Database error occurred...
        console.log("Database Error!1");
        req.flash('error_msg', 'Database Error!');
        res.send({status: 500});
        } else {
        // Successful query
        if (user) {
            // Customer found!
            console.log("User " + email + " found!");
            // Check password with hashed value in the database
            console.log("Comparing password bcrypt hash of (", password, ") to user.password ", user.password);
        bcrypt.compare(password, user.password, (err, result) => {
            // passwords match (result == true)
            if (result) {
            // Update session object once matched!
            req.session.user = user._id;
            req.session.name = user.email;
            //req.session.model = user;
            //console.log(req.session);

            if (user.usertype == "customer") {
                customerModel.getOne({uID : user._id}, (err, customer) => {
                if (err){
                    // Database error occurred...
                    console.log("Database Error!2");
                    req.flash('error_msg', 'Database Error!');
                    res.redirect('/');
                }
                else{
                    if (customer){
                        console.log("Customer found and Logged in");
                        req.session.model = customer;
                        req.session.usertype = user.usertype;           
                        //res.redirect('/customer/profile');
                        res.send({status: 'customer'});
                    }
                    else{
                        console.log("Customer not found");           
                        res.redirect('/');
                    }
                }
                });

            } else if (user.usertype == "restaurant") {
                restaurantModel.getOne({uID: user._id}, (err, restaurant) =>{
                    if(err){
                        //Database error occurred...
                        console.log(err);
                        console.log("Here")
                        req.flash('error_msg', 'Database Error!');
                        res.redirect('/');
                
                    }
                    else{
                        if(restaurant){
                            console.log("Restaurant found");
                            req.session.model = restaurant;
                            req.session.usertype = user.usertype;   
                            res.send({status: 'restaurant'});
                        }
                        else{
                            console.log("Restaurant not found");
                            res.redirect('/');
                        }
                    }
                    })
            } else {
                res.redirect('/');
            }

            } else {
            // passwords don't match
            console.log("Incorrect password for" + email + ". Please try again.");
            req.flash('error_msg', 'Incorrect password. Please try again.');
            res.send({status: 401});
            }
        });
        } else {
            // No User found
            console.log("Unregistered Email.");
            req.flash('error_msg', 'Unregistered Email.');
            res.send({status : 409});
        }
        }}
        )
    } else {
        //Missing Credentials
           const messages = errors.array().map((item) => item.msg);
            req.flash('error_msg', messages.join(' '));
    };
};

exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
        console.log("Logged out.")
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  }
};

exports.changePassword = function(req,res){
  console.log("Usercontroller");
  const userID = req.session.user;
  const password = req.body.password;
  const curPass = req.body.cPass;
  const saltRounds = 10;
  userModel.getOne({ email: req.session.model.email }, (err, user) => {
    if (err) {
    // Database error occurred...
    console.log("Database Error!1");
    req.flash('error_msg', 'Database Error!');
    res.send({status: 500});
    } else {
    // Successful query
    if (user) {
        // Customer found!
        // Check password with hashed value in the database
    
    bcrypt.compare(curPass, user.password, (err, result) => {

        if (result) {
          bcrypt.hash(password, saltRounds, function(err, hashed){
            userModel.update_password(userID, hashed, function(result){
                res.send({status: req.session.usertype});
            })
          })

        } else {
        // passwords don't match
        res.send({status: 401});
        }
    });
    } else {
        res.send({status : 500});
    }
    }}
    )


};
