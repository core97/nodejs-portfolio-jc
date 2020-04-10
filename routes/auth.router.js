const express = require('express');

const authController = require('../controllers/auth.controller');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isPasswordValid } = require('../middlewares/isPasswordValid');

const router = express.Router();

// http://localhost:8080/auth/is-logged
router.get('/is-logged', [isAuthenticated], authController.isLoggedIn);

// http://localhost:8080/auth/register
router.post('/register', [isPasswordValid], authController.register);

// http://localhost:8080/auth/login
router.post('/login', [isPasswordValid], authController.login);

module.exports = router;
