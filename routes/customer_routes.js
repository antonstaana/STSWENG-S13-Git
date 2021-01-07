const router = require('express').Router();

const customer_controller = require('../controllers/customer_controller');

router.get('/profile', customer_controller.get_customer_profile);

module.exports = router;