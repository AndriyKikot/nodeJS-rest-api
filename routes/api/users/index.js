const express = require('express');
const router = express.Router();

const usersController = require('../../../controllers/users');
const guard = require('../../../helpers/guard');
// const validate = require('./validation.js');
// const validateId = require('./validationId.js');

router.post('/auth/register', usersController.register);
router.post('/auth/login', usersController.login);
router.post('/auth/logout', guard, usersController.logout);

module.exports = router;
