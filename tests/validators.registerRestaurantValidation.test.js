const { validationResult } = require('express-validator');
const { registerCustomerValidation, registerRestaurantValidation, loginValidation, testExpressValidatorMiddleware } = require('../validators');
const httpMocks = require('node-mocks-http');

//Passing Values
const email = "email@email.com";
const displayname = "displayname";
const category = "Cafe";
const street = "street";
const city_province = "city_province";
const contactno = "012345678910";
const password = "p@ssword123";
const password2 = "p@ssword123";

//Limit constants
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 255;

describe('All valid', () => {
  it('When all inputs are valid, then no error messages are sent', async () => {
    // Arrange
    var req = httpMocks.createRequest({ body: { email, displayname, category, street, city_province, contactno, password, password2 }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerRestaurantValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors).toEqual([]);
  });
});

describe('No input for email field', () => {
  it('When the email field is empty, then the "Email is required" error message is sent', async () => {
    // Arrange
    var email = undefined;
    var req = httpMocks.createRequest({ body: { email, displayname, category, street, city_province, contactno, password, password2 }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerRestaurantValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Email is required.");
  });
});

describe('No input for displayname field', () => {
  it('When the displayname field is empty, then the "Display Name is required" error message is sent', async () => {
    // Arrange
    var displayname = undefined;
    var req = httpMocks.createRequest({ body: { email, displayname, category, street, city_province, contactno, password, password2 }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerRestaurantValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Display Name is required.");
  });
});

describe('No input for category field', () => {
  it('When the category field is empty, then the "Category is required." error message is sent', async () => {
    // Arrange
    var category = undefined;
    var req = httpMocks.createRequest({ body: { email, displayname, category, street, city_province, contactno, password, password2 }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerRestaurantValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Category is required.");
  });
});

describe('No input for street field', () => {
  it('When the street field is empty, then the "Street is required." error message is sent', async () => {
    // Arrange
    var street = undefined;
    var req = httpMocks.createRequest({ body: { email, displayname, category, street, city_province, contactno, password, password2 }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerRestaurantValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Street is required.");
  });
});

describe('No input for city_province field', () => {
  it('When the city_province field is empty, then the "city_province is required." error message is sent', async () => {
    // Arrange
    var city_province = undefined;
    var req = httpMocks.createRequest({ body: { email, displayname, category, street, city_province, contactno, password, password2 }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerRestaurantValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("city_province is required.");
  });
});

describe('No input for contactno field', () => {
  it('When the contactno field is empty, then the "Enter Contact No." error message is sent', async () => {
    // Arrange
    var contactno = undefined;
    var req = httpMocks.createRequest({ body: { email, displayname, category, street, city_province, contactno, password, password2 }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerRestaurantValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Enter Contact No.");
  });
});

describe('Below minimum input for contactno field', () => {
  it('When the contactno field input is below minimum, then the "Enter valid contact number" error message is sent', async () => {
    // Arrange
    var contactno = 9775374952;
    var req = httpMocks.createRequest({ body: { email, displayname, category, street, city_province, contactno, password, password2 }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerRestaurantValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Enter valid contact number");
  });
});


describe('No input for password field', () => {
  it('When the password field is empty, then the "Password must be at least " + PASSWORD_MIN + " characters long." error message is sent', async () => {
    // Arrange
    var password = undefined;
    var req = httpMocks.createRequest({ body: { email, displayname, category, street, city_province, contactno, password, password2 }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerRestaurantValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Password must be at least " + PASSWORD_MIN + " characters long.");
  });
});

describe('Below minimum input for password field', () => {
  it('When the password field input is below minimum, then the "Password must be at least " + PASSWORD_MIN + " characters long." error message is sent', async () => {
    // Arrange
    var password = "aaa";
    var req = httpMocks.createRequest({ body: { email, displayname, category, street, city_province, contactno, password, password2 }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerRestaurantValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Password must be at least " + PASSWORD_MIN + " characters long.");
  });
});

describe('Above maximum input for password field', () => {
  it('When the password field input is above maximum, then the "Password must be less than " + PASSWORD_MAX + " characters long." error message is sent', async () => {
    // Arrange
    //256 Characters
    var password = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    var req = httpMocks.createRequest({ body: { email, displayname, category, street, city_province, contactno, password, password2 }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerRestaurantValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Password must be less than " + PASSWORD_MAX + " characters long.");
  });
});

describe('Input in password fields do not match', () => {
  it('When the password field input is different, then the "Passwords must match." error message is sent', async () => {
    // Arrange
    //256 Characters
    var password = "abcdefg123";
    var req = httpMocks.createRequest({ body: { email, displayname, category, street, city_province, contactno, password, password2 }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerRestaurantValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Passwords must match.");
  });
});
