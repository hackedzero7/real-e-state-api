const express = require("express");
const { messagefromIntrusredUser, reciveMessageFromUser } = require("../controllers/interustedUserController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();


router.route('/interusteduser/:id').post(messagefromIntrusredUser);
// router.route('/getinterusteduser').get(isAuthenticated, reciveMessageFromUser);

module.exports = router