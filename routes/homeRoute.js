const { Router } = require('express');

const router = new Router();
const homeController = require('./../controllers/homeController');
const HomeController = new homeController();

// Home -- GET
router.get('/', HomeController.getIndex);

module.exports = router;