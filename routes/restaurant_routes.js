const router = require('express').Router();
module.exports = router;

const restaurant_controller = require('../controllers/restaurant_controller');

router.get('/profile', restaurant_controller.get_userResto);

router.get('/:restaurantId', restaurant_controller.get_restaurant_profile); // Customer View