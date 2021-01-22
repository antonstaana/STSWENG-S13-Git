const router = require('express').Router();

const restaurant_controller = require('../controllers/restaurant_controller');

router.get('/profile', restaurant_controller.get_userResto);

router.get('/editMenu', restaurant_controller.get_edit_menu);

router.post('/addProduct', restaurant_controller.addProduct);//add Product to tempArr of items to be added to menu

router.post('/addToDel', restaurant_controller.removeProduct);//adds existing product to tempArr of items to be deleted

router.get('/editProfile', restaurant_controller.get_edit_profile);//get edit profile page

router.post('/updateProfile', restaurant_controller.update_profile); // Update Restaurant Profile

router.post('/save', restaurant_controller.saveChanges); //Updates Restaurant Menu



router.get('/:restaurantId', restaurant_controller.get_restaurant_profile); // Customer View of a restaurant

module.exports = router;