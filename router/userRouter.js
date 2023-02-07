const express = require('express');

const { registeration, login, logout, getUserDetails, getSingleUser, getAllUsers, updateProfileUser, updateUserProfileAdmin, deleteUserProfile } = require('../controllers/userController');
const { isAuthenticated, AutherizedRole } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(registeration);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticated, getUserDetails);
router.route('/me/update').put(isAuthenticated, updateProfileUser);
router.route('/admin/users').get(isAuthenticated, AutherizedRole("admin"), getAllUsers);
router.route('/admin/user/:id').get(isAuthenticated, AutherizedRole("admin"), getSingleUser)
.put(isAuthenticated, AutherizedRole('admin'), updateUserProfileAdmin)
.delete(isAuthenticated, AutherizedRole("admin"), deleteUserProfile);


module.exports = router;