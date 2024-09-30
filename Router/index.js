const router = require("express").Router();
const { routes } = require("../routes/endPoint");

const { verifyToken, verifyRole } = require("../middleware/Authentication");

const {
  CreateProfile,
  updateProfile,
  getProfileById,
  listProfile,
  deleteProfile,
  forgetPassword,
  loginProfile,
  resetPassword,
  changePassword,
  loginMobileNumber
} = require("../controller/profileController");
const { errHandle } = require("../middleware/errorHandler");

router.post(routes.v1.user.CreateProfile, CreateProfile); // done
router.put(
  routes.v1.user.updateProfile,
  (verifyToken, verifyRole(["user", "admin"])),
  updateProfile // done
);
router.post(routes.v1.user.loginProfile, loginProfile); // done
router.post(routes.v1.user.forgetPassword, (verifyToken, verifyRole(["user", "admin"])), forgetPassword);// done
router.put(routes.v1.user.changePassword, changePassword)// done
router.put(
  routes.v1.user.resetPassword,
  [verifyToken, verifyRole(["user", "admin"])],
  resetPassword
);// done
router.get(routes.v1.user.getById,[verifyToken, verifyRole(["user", "admin"])],getProfileById)// done
router.get("/list/profile",[verifyToken, verifyRole(["user", "admin"])],listProfile)
router.delete(routes.v1.user.deleteProfile,[verifyToken, verifyRole(["user", "admin"])],deleteProfile) // done
router.post(routes.v1.user.loginMobileNumber, loginMobileNumber) // done


router.use(errHandle)
module.exports = router;
