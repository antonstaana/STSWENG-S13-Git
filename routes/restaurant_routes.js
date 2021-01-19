const router = require('express').Router();

const restaurant_controller = require('../controllers/restaurant_controller');

router.get('/profile', restaurant_controller.get_userResto);

router.get('/editMenu', restaurant_controller.get_edit_menu);

router.post('/addProduct', restaurant_controller.addProduct);//add Product to menu (May change to update menu)

router.get('/editProfile', restaurant_controller.get_edit_profile);

router.post('/updateProfile', restaurant_controller.update_profile); // Update Restaurant Profile

router.post('/save', restaurant_controller.saveChanges);

router.get('/:restaurantId', restaurant_controller.get_restaurant_profile); // Customer View

module.exports = router;