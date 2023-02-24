const { Router } = require('express');

const router = new Router();
const userController = require('./../controllers/userController');
const UserController = new userController();

module.exports = router;