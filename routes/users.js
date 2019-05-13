const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/:userId(\\d+)', usersController.getUserById);

module.exports = router;
