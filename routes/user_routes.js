const router = require('express').Router();
const user_controller = require('../controllers/user_controller');
const {registerCustomerValidation, registerRestaurantValidation, loginValidation} = require('../validators.js');
const { isPublic, isPrivate } = require('../middlewares/authenticator');

router.post('/register_customer', registerCustomerValidation, user_controller.register_customer);
router.post('/register_restaurant', registerRestaurantValidation, user_controller.register_restaurant);
router.post('/login', loginValidation, user_controller.login);
router.get('/logout', user_controller.logout);
//router.get('/customer_profile', user_controller.get_customer_profile);

module.exports = router;
