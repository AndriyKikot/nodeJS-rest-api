const express = require('express');
const router = express.Router();

const usersController = require('../../../controllers/users');
const guard = require('../../../helpers/guard');
const { createAccountLimiter } = require('../../../helpers/rate-limit-reg')
// const validate = require('./validation.js');
// const validateId = require('./validationId.js');

router.post('/auth/register', createAccountLimiter, usersController.register);
router.post('/auth/login', usersController.login);
router.post('/auth/logout', guard, usersController.logout);

module.exports = router;
