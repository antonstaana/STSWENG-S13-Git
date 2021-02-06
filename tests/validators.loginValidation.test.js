const { validationResult } = require('express-validator');
const { registerCustomerValidation, registerRestaurantValidation, loginValidation, testExpressValidatorMiddleware } = require('../validators');
const httpMocks = require('node-mocks-http');

//Passing Values
const email = "email@email.com";
const password = "p@ssword123";

//Limit constants
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 255;

describe('All valid', () => {
  it('When all inputs are valid, then no error messages are sent', async () => {
    // Arrange
    var req = httpMocks.createRequest({ body: { email, password }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, loginValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors).toEqual([]);
  });
});

describe('No input for email field', () => {
  it('When the email field is empty, then the "Email is required" error message is sent', async () => {
    // Arrange
    var email = undefined;
    var req = httpMocks.createRequest({ body: { email, password }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, loginValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Email is required.");
  });
});


describe('No input for password field', () => {
  it('When the password field is empty, then the "Password is required.', async () => {
    // Arrange
    var password = undefined;
    var req = httpMocks.createRequest({ body: { email, password }});
    var res = httpMocks.createResponse();
    // Act
    await testExpressValidatorMiddleware(req, res, loginValidation);
    const result = validationResult(req);
    // Assert
    expect(result.errors[0].msg).toEqual("Password is required.");
  });
});
