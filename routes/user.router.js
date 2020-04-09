const express = require('express');

const userController = require('../controllers/user.controller');

const router = express.Router();

// http://localhost:8080/user
router.get('/', userController.getAllUser);

// http://localhost:8080/user/:id
router.get('/:id', userController.getUserById);

// http://localhost:8080/user
router.delete('/', userController.deleteAllUsers);

// http://localhost:8080/user/:id
router.delete('/:id', userController.deleteUser);

// http://localhost:8080/user/:id
router.put('/:id', userController.updateUser);

module.exports = router;
