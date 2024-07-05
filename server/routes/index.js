const express = require('express');
const router = express.Router();
const registerUserController = require('./../controller/register-user');
const checkEmailController = require('./../controller/check-email');
const checkPasswordController = require('./../controller/check-password');
const userDetailsController = require('./../controller/user-details');

/// create user api
router.post('/register', registerUserController)

/// check user email
router.post('/email', checkEmailController)

/// Check user password
router.post('/password', checkPasswordController)

/// login user details
router.get('/user-details', userDetailsController)
module.exports = router;