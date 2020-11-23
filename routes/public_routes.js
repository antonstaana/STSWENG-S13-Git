const router = require('express').Router();
module.exports = router;

const public_controller = require('../controllers/public_controller');

router.get('/', public_controller.get_landing);

router.get('/about', public_controller.get_about);

router.get('/contacts', public_controller.get_contacts);

router.get('/privacy', public_controller.get_privacy);

router.get('/terms', public_controller.get_terms);