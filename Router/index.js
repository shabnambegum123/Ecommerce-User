const router = require('express').Router()
const { routes } = require("../route/endPoint");

const {verifyToken, verifyRole} = require("../middleware/Authentication")

const {CreateProfile,updateProfile,getProfileById,listProfile,deleteProfile,loginProfile} = require("../controller/controller")

router.post(routes.v1.user.CreateProfile,CreateProfile) // dpne
router.put(routes.v1.user.updateProfile,verifyToken(['user', 'admin']),updateProfile)
router.post(routes.v1.user.loginProfile,loginProfile)  // done
// router.get("/getById/profile",[verifyToken, verifyRole("User")],getProfileById)
// router.get("/list/profile",[verifyToken, verifyRole("User")],listProfile)
// router.delete("/delete/profile",[verifyToken, verifyRole("User")],deleteProfile)











module.exports = router