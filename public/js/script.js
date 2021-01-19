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
    
    $.post('register_customer', {email:email, username:username, password:password, password2:confirmPassword, displayname: displayname, street:street, city_province:city_province, contactno:contactno}, function(res) {
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

function newProduct() {
  var name = document.forms["addnewProduct"]["new-item-name"].value;
  var desc = document.forms["addnewProduct"]["new-item-desc"].value;
  var price = document.forms["addnewProduct"]["new-item-price"].value;
  var category = document.forms["addnewProduct"]["new-item-category"].value;
  name.trim();
  desc.trim();
  category.trim()
  if (name == "" || desc == "" || price == "" || category == ""  ) {
       console.log("Error:Missing Creds");
    $('p#newItemError').text('Please enter missing credentials'); 
    return false;
  }
 /* var check = function() {

    var lastNameValidation = /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/i
    
    var custname = document.querySelector("#name").value;
  
    var customerFullName = custname;
  
    if (!(customerFullName.match(lastNameValidation))) {
      alert('Invalid characters in first or last name. Only alphabetic letters, apostrophe, accents and hypen characters allowed<br/>');
    } else {
      alert("perfect")
    }
   }*/

  $.post('/restaurant/addProduct', { name:name, category:category, desc:desc, price:price}, function(res){
    switch(res.status){
      case 200: {
        alert(name + " added. Please remember to save your changes before leaving this page.")
        window.location.href = "/restaurant/editMenu";
      }
    }
  })
  return false;
};

function updateRestoProfile(){
  var name = document.forms["updateRProfile"]["resto-name"].value;
  var desc = document.forms["updateRProfile"]["resto-desc"].value;
  var street = document.forms["updateRProfile"]["resto-street"].value;
  var city =document.forms["updateRProfile"]["resto-city"].value;
  var openT =  document.forms["updateRProfile"]["resto-open-hour"].value;
  var closeT = document.forms["updateRProfile"]["resto-close-hour"].value;
  var category = document.forms["updateRProfile"]["resto-category"].value;
  var contactno = document.forms["updateRProfile"]["resto-contact"].value;
  var storehours = openT + " - " + closeT;
  var location = street + ", " + city;

  name.trim(); desc.trim(); street.trim(); city.trim();category.trim(); //Removes white spaces in the front and back of these fields
  if(name =="" || desc =="" || street  =="" || city  =="" || openT =="" || closeT  =="" || category  =="" || contactno  =="" ){
    alert("All fields must be filled to save")
    return false
  }

      $.post('/restaurant/updateProfile', {name:name, desc:desc, location:location, 
              storehours:storehours, category:category, contact:contactno}, function(res){
        switch(res.status){
          case 200: {
          alert("Profile Successfully Updated");
          window.location.href = "/restaurant/profile";
          }
        }        
      })
}

function updateCustoProfile(){
  var Fname = document.forms["updateCProfile"]["custo-Fname"].value;
  var Lname = document.forms["updateCProfile"]["custo-Lname"].value;
  var street = document.forms["updateCProfile"]["custo-street"].value;
  var city =document.forms["updateCProfile"]["custo-city"].value;
  var contactno = document.forms["updateCProfile"]["custo-contact"].value;
  var location = street + ", " + city;
  Fname.trim(); Lname.trim();  street.trim(); city.trim(); //Removes white spaces in the front and back of these fields
  if(Fname =="" ||Lname ==""  || street  =="" || city  =="" ||  contactno  =="" ){
    alert("All fields must be filled to save");
    return false;
  }
  
      $.post('/customer/updateProfile', {username:Fname, displayname: Lname, location:location,  contact:contactno}, function(res){
        switch(res.status){
          case 200: {
          alert("Profile Successfully Updated");
          window.location.href = "/customer/profile";
          }
        }      
      })


}

$(document).ready(function() {

  $('[data-toggle="tooltip"]').tooltip(); //Bootstrap Tool tips

  //[NOT IN USE] Restaurant Cards on search Page on click go to restaurant profile 
  $('body').on('click', '.restaurant-card', function() {
    window.location.href = "/restaurant_profile";

    });

    //Onclick Landing Restaurant Cards got to respective Restaurant Profile
  $('body').on('click', '.r-landing-card', function() {
    let id = $(this).attr('data');
    window.location.href = "/restaurant/" + id;
    });

    //After Adding Items to restaurant menu Save
  $('body').on('click', '.save-menu', function() {
    $.post('/restaurant/save', {bod:"hi"}, function(res) {
      switch(res.status){
        case 200:{
          alert("Menu changed successfully");
          window.location.href = "/restaurant/profile";
        }
      }
    })
  });
  //Add new Item to temp arr of items, then reload the page
  $('body').on('click', '.go-menu-edit', function() {
    window.location.href = "/restaurant/editMenu";
  })

  $('body').on('click', '.go-edit-RProfile', function() {
    window.location.href = "/restaurant/editProfile";
  })

  $('body').on('click', '.cancel-Restaurant', function(){
    alert("Cancelled changes");
    window.location.href = "/restaurant/profile";
  })

  $('body').on('click', '.go-edit-CProfile', function() {
    window.location.href = "/customer/editProfile";
  })

  $('body').on('click', '.cancel-Customer', function(){
    alert("Cancelled changes");
    window.location.href = "/customer/profile";
  })

});   
