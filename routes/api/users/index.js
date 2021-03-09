const express = require('express');
const router = express.Router();

const usersContreller = require('../../../controllers/users.js');
// const validate = require('./validation.js');
// const validateId = require('./validationId.js');

router.post('/auth/register', usersContreller.register);
router.post('/auth/login', usersContreller.login);
router.post('/auth/logout', usersContreller.logout);

module.exports = router;
