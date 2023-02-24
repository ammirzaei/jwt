const { Router } = require('express');

const router = new Router();
const userController = require('./../controllers/userController');
const UserController = new userController();

// User Register -- POST
router.post('/register', UserController.handleRegister);
module.exports = router;