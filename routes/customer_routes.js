const router = require('express').Router();

const customer_controller = require('../controllers/customer_controller');

router.get('/profile', customer_controller.get_customer_profile);

router.get('/editProfile', customer_controller.get_edit_profile);

router.post('/updateProfile', customer_controller.update_profile);

router.post('/editProfile', customer_controller.edit_profile);

module.exports = router;
