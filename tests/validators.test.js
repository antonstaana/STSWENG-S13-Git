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
