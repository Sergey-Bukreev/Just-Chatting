const express = require('express');
const router = express.Router();
const registerUserController = require('./../controller/register-user');
const checkEmailController = require('./../controller/check-email');
const checkPasswordController = require('./../controller/check-password');
const userDetailsController = require('./../controller/user-details');
const logoutController = require('./../controller/logout');
const updateUserDetailsController = require('./../controller/update-user-details');
const searchUserController = require('./../controller/search-user');
/// create user api
router.post('/register', registerUserController)

/// check user email
router.post('/email', checkEmailController)

/// Check user password
router.post('/password', checkPasswordController)

/// login user details
router.get('/user-details', userDetailsController)

///logout user
router.get('/logout', logoutController )

/// update user details
router.post('/update-user', updateUserDetailsController)

/// search users
router.post('/search-users', searchUserController)

module.exports = router;