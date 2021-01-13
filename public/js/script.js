function validateLogin() {
  var email = document.forms["login"]["email"].value;
  var password = document.forms["login"]["password"].value;
  if (email == "" || password == "" ) {
    $('p#loginError').text('Please enter missing credentials.');
    return false;
  }
  else{
    $.post('/login', {email:email, password:password}, function(res) {
      switch(res.status){
        case 401:{
          $('p#loginError').text('Incorrect Password.');
          break;
        }
        case 409:{
          $('p#loginError').text('Account does not exist.');
          break;
        }
        case 500:{
          $('p#loginError').text('Server Error. Try again.');
						break;
        }
        case 'customer':{
          window.location.href = "/customer/profile";
          break;
        }
        case 'restaurant':{
          window.location.href = "/restaurant/profile";
          break;
        }
      }
    })
    return false;
  }
};

function validateRegister() {
  var email = document.forms["register_customer"]["email"].value;
  var password = document.forms["register_customer"]["password"].value;
  var confirmPassword = document.forms["register_customer"]["password2"].value;
  var username  = document.forms["register_customer"]["username"].value;
  var displayname  = document.forms["register_customer"]["displayname"].value;
  var street = document.forms["register_customer"]["street"].value;
  var city_province = document.forms["register_customer"]["city_province"].value;
  var contactno = document.forms["register_customer"]["contactno"].value;
  var image = document.forms["register_customer"]["image"].value;

  if (email == "" || password == "" || confirmPassword == "" || 
      displayname == ""  ||
      contactno =="" ) {
        console.log("Error:Missing Creds");
    $('p#registerError').text('Please enter missing credentials');
    return false;
  }
  else if(password.includes(" ")){
    $('p#registerError').text('Password contains invalid characters');
    return false;
  }
  else if(password.length < 8){
    console.log("Error: Pass too short");
    $('p#registerError').text('Password must contain 8 characters');
    return false;
  }
  else if(password != confirmPassword){
    console.log("Error:Mismatched pass");
    $('p#registerError').text('Please confirm your password');
    return false;
  }
  else{
    
    $.post('/register_customer', {email:email, username:username, password:password, password2:confirmPassword, displayname: displayname, street:street, city_province:city_province, contactno:contactno}, function(res) {
      switch(res.status){
        case 200: {
          window.location.href = "/customer/profile";
          break;
        }
        case 401:{
          $('p#registerError').text('Email already connected to an account');
          break;
        }
        case 500:{
          $('p#registerError').text('Server Error. Try again.');
						break;
        }
      }
    })
    return false;
  }
};




function validateRestoRegister() {
  var email = document.forms["register_restaurant"]["email"].value;
  var password = document.forms["register_restaurant"]["password"].value;
  var confirmPassword = document.forms["register_restaurant"]["password2"].value;
  var username  = document.forms["register_restaurant"]["username"].value;
  var displayname  = document.forms["register_restaurant"]["displayname"].value;
  var category  = document.forms["register_restaurant"]["category"].value;
  var street = document.forms["register_restaurant"]["street"].value;
  var city_province = document.forms["register_restaurant"]["city_province"].value;
  var contactno = document.forms["register_restaurant"]["contactno"].value;
  var image = document.forms["register_restaurant"]["image"].value;

  if (email == "" || password == "" || confirmPassword == "" || 
      displayname == ""  || contactno == "" || category == "" || street =="" || city_province == "") {
        console.log("Error:Missing Creds");
    $('p#registerError').text('Please enter missing credentials');
    return false;
  }
  else if(password.includes(" ")){
    $('p#registerError').text('Password contains invalid characters');
    return false;
  }
  else if(password.length < 8){
    console.log("Error: Pass too short");
    $('p#registerError').text('Password must contain 8 characters');
    return false;
  }
  else if(password != confirmPassword){
    console.log("Error:Mismatched pass");
    $('p#registerError').text('Please confirm your password');
    return false;
  }
  else{
    
    $.post('/register_restaurant', {email:email, username:username, password:password, 
                                    password2:confirmPassword, displayname: displayname,
                                    street:street, city_province:city_province, contactno:contactno,
                                    category:category}, function(res) {
      switch(res.status){
        case 200: {
          window.location.href = "/restaurant/profile";
          break;
        }
        case 401:{
          $('p#registerError').text('Email already connected to an account');
          break;
        }
        case 500:{
          $('p#registerError').text('Server Error. Try again.');
						break;
        }
      }
    })
    return false;
  }
};

$(document).ready(function() {
  $('body').on('click', '.restaurant-card', function() {
    window.location.href = "/restaurant_profile";

    });

    
$('body').on('click', '.r-landing-card', function() {
  let id = $(this).attr('data');
  window.location.href = "/restaurant/" + id;
  });
});   
