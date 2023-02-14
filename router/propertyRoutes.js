const express = require("express");
const {
  createProperty,
  getAdminALLProperty,
  getAllProperties,
  getPropertyDetails,
  updateProperties,
  deleteProperty,
  incrementVeiws,
  addToFavraite,
  removeToFavorites,
  intrustedUser,
  reciveMessageFromUser,
} = require("../controllers/propertyController");
const { isAuthenticated, AutherizedRole } = require("../middleware/auth");
const router = express.Router();

router.route("/property/create").post(isAuthenticated, createProperty);
router.route("/properties").get(getAllProperties);
router.route("/property/:id").get(getPropertyDetails);
router.route("/property/:id/favorites").post(isAuthenticated, addToFavraite)
.delete(isAuthenticated, removeToFavorites);
router.route('/property/:id/interusted-user').get(isAuthenticated, reciveMessageFromUser);
router.route("/property/:id/views").patch(incrementVeiws);
router.route('/property/update/:id').put(isAuthenticated, AutherizedRole("admin", "user"), updateProperties);
router.route('/property/delete/:id').delete(isAuthenticated, AutherizedRole("admin","user"), deleteProperty);
router
  .route("/admin/properties")
  .get(isAuthenticated, AutherizedRole("admin"), getAdminALLProperty);

module.exports = router;
