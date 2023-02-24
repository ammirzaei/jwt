const { Router } = require('express');

const router = new Router();
const userController = require('./../controllers/userController');
const UserController = new userController();

// User Register -- POST
router.post('/register', UserController.handleRegister);

// User Login -- POST
router.post('/login', UserController.handleLogin);

module.exports = router;