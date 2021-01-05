const router = require('express').Router();
module.exports = router;

const restaurant_controller = require('../controllers/restaurant_controller');

router.get('/profile', restaurant_controller.get_userResto);