const express = require('express');

const userController = require('../controllers/user.controller');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

const router = express.Router();

// http://localhost:8080/user
router.get('/', [isAuthenticated], userController.getAllUser);

// http://localhost:8080/user/:id
router.get('/:id', [isAuthenticated], userController.getUserById);

// http://localhost:8080/user
// router.delete('/', [isAuthenticated], userController.deleteAllUsers);

// http://localhost:8080/user/:id
router.delete('/:id', [isAuthenticated], userController.deleteUser);

// http://localhost:8080/user/:id
router.put('/:id', [isAuthenticated], userController.updateUser);

module.exports = router;
