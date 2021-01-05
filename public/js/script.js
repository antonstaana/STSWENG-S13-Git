function validateLogin() {
  var email = document.forms["login"]["Lemail"].value;
  var password = document.forms["login"]["Lpws"].value;
  if (email == "" || password == "" ) {
    alert("Please enter missing credentials");
    $('p#loginError').text('Please enter missing credentials');
    return false;
  }
};

function validateRegister() {

  var email = document.forms["customerRegister"]["Remail"].value;
  var password = document.forms["customerRegister"]["Rpassword"].value;
  var confirmPassword = document.forms["customerRegister"]["RConfirmPassword"].value;
  var displayname  = document.forms["customerRegister"]["displayname"].value;
  var street = document.forms["customerRegister"]["street"].value;
  var city_province = document.forms["customerRegister"]["city_province"].value;
  var contactno = document.forms["customerRegister"]["contactno"].value;
  var image = document.forms["customerRegister"]["image"].value;

  if (email == "" || password == "" || confirmPassword == "" || 
      displayname == "" || street == "" || city_province == "" ||
      contactno =="" || image == "" ) {
    alert("Please enter missing values");
    return false;
  }
  if(password != confirmPassword){
    alert("Passwords are not the same")
    return false;
  }
};

$(document).ready(function() {



  $('body').on('click', '.restaurant-card', function() {
    window.location.href = "/restaurant_profile";

    });
  });   