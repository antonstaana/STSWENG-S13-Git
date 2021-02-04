//npm install --save-dev node-mocks-http
//npm install --save-dev jest

const { validationResult } = require('express-validator');
const { registerCustomerValidation, registerRestaurantValidation, loginValidation, testExpressValidatorMiddleware } = require('../validators');
const httpMocks = require('node-mocks-http');

//Passing Values
const email = "email@email.com";
const username = "username";
const password = "p@ssword123";
const password2 = "p@ssword123";
const displayname = "displayname";
const street = "street";
const city_province = "city_province";
const contactno = "012345678910";

//Limit constants
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 255;

describe('All valid', () => {
  it('When all inputs are valid, then no error messages are sent', async () => {
    // Arrange
    var req = httpMocks.createRequest({ body: { email, username, password, password2, displayname, street, city_province, contactno }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerCustomerValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors).toEqual([]);
  });
});

describe('No input for email field', () => {
  it('When the email field is empty, then the "Email is required" error message is sent', async () => {
    // Arrange
    var email = undefined;
    var req = httpMocks.createRequest({ body: { email, username, password, password2, displayname, street, city_province, contactno }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerCustomerValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Email is required.");
  });
});

describe('Non-email input for email field', () => {
  it('When a non-email string is inputted to the email field, then the "Input must be an email." error message is sent', async () => {
    // Arrange
    var email = "thisisnotanemail123";
    var req = httpMocks.createRequest({ body: { email, username, password, password2, displayname, street, city_province, contactno }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerCustomerValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Input must be an email.");
  });
});

describe('No input for username field', () => {
  it('When the username field is empty, then the "Username is required" error message is sent', async () => {
    // Arrange
    var username = undefined;
    var req = httpMocks.createRequest( {body: { email, username, password, password2, displayname, street, city_province, contactno }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerCustomerValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Username is required.");
  });
});

describe('No input for password field', () => {
  it('When the password field is empty, then the "Password must be at least " + PASSWORD_MIN + " characters long." error message is sent', async () => {
    // Arrange
    var password = undefined;
    var req = httpMocks.createRequest({ body: { email, username, password, password2, displayname, street, city_province, contactno }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerCustomerValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Password must be at least " + PASSWORD_MIN + " characters long.");
  });
});

describe('Below minimum input for password field', () => {
  it('When the password field input is below minimum, then the "Password must be at least " + PASSWORD_MIN + " characters long." error message is sent', async () => {
    // Arrange
    var password = "aaa";
    var req = httpMocks.createRequest({ body: { email, username, password, password2, displayname, street, city_province, contactno }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerCustomerValidation);
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
    var req = httpMocks.createRequest({body: { email, username, password, password2, displayname, street, city_province, contactno }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerCustomerValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Password must be less than " + PASSWORD_MAX + " characters long.");
  });
});

describe('Above maximum input for password field', () => {
  it('When the password field input is above maximum, then the "Password must be less than " + PASSWORD_MAX + " characters long." error message is sent', async () => {
    // Arrange
    //256 Characters
    var password = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    var req = httpMocks.createRequest({body: { email, username, password, password2, displayname, street, city_province, contactno }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, registerCustomerValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Password must be less than " + PASSWORD_MAX + " characters long.");
  });
});
