const {
  signInAdmin,
  getSignInView,
  getHomeAdmin,
  signUpAdmin,
  getSignUpView,
  editUserAdmin,
  getEditUserView,
  deleteUserAdmin,
  logout,
  getAddUserView,
  addUserAdmin,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/signup-admin", signUpAdmin);
router.post("/signin-admin", signInAdmin);
router.get("/signin-admin", getSignInView);
router.get("/signup-admin", getSignUpView);
router.get("/admin-panel", getHomeAdmin);
router.get("/edit-user/:id", getEditUserView);
router.post("/edit-user/:id", editUserAdmin);
router.get("/delete-user/:id", deleteUserAdmin);
router.get("/add-admin", getAddUserView);
router.post("/add-user", addUserAdmin);
router.get("/admin-logout", logout);

module.exports = router;
