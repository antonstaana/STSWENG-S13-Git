const {body} = require('express-validator');

const registerCustomerValidation = [
  body('email').not().isEmpty().withMessage("Email is required."),
  body('username').not().isEmpty().withMessage("Username is required."),
  body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long."),
  body('password2').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match.");
      }
      return true;
    }),
  body('displayname').not().isEmpty().withMessage("Display Name is required."),
  body('street').not().isEmpty().withMessage("Street is required."),
  body('city_province').not().isEmpty().withMessage("city_province is required."),
  body('contactno').not().isEmpty().withMessage("Enter Contact No.").isLength({min : 11}).withMessage("Enter valid contact number")
];

const registerRestaurantValidation = [
  body('email').not().isEmpty().withMessage("Email is required."),
  body('username').not().isEmpty().withMessage("Username is required."),
  body('displayname').not().isEmpty().withMessage("Display Name is required."),
  body('category').not().isEmpty().withMessage("Category is required."),
  body('street').not().isEmpty().withMessage("Street is required."),
  body('city_province').not().isEmpty().withMessage("city_province is required."),
  body('contactno').not().isEmpty().withMessage("Enter Contact No.").isLength({min : 11}).withMessage("Enter valid contact number"),
  body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long."),
  body('password2').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match.");
      }
      return true;
    })
];

const loginValidation = [
  body('email').not().isEmpty().withMessage("Email is required."),
  body('password').not().isEmpty().withMessage("Password is required.")
];

module.exports = { registerCustomerValidation, registerRestaurantValidation, loginValidation };
