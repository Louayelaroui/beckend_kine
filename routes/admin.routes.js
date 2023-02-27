const {
  signInAdmin,
  getSignInView,
  getHomeAdmin,
  signUpAdmin,
  getSignUpView,
  editUserAdmin,
  getEditUserView,
  deleteUserAdmin,
  logoutAdmin,
  getAddUserView,
  addUserAdmin,
} = require("../controllers/admin.controller");
const { isAdmin } = require("../middleware/isAdmin.middleware");
const { isAuthLocalStorage } = require("../middleware/isAuth.middleware");

const router = require("express").Router();

router.post("/signup", signUpAdmin);
router.post("/signin", signInAdmin);
router.get("/signin", getSignInView);
router.get("/signup", getSignUpView);
router.get("/", isAuthLocalStorage, isAdmin, getHomeAdmin);
router.get("/edit-user/:id", isAuthLocalStorage, isAdmin, getEditUserView);
router.post("/edit-user/:id", isAuthLocalStorage, isAdmin, editUserAdmin);
router.get("/delete-user/:id", isAuthLocalStorage, isAdmin, deleteUserAdmin);
router.get("/add", isAuthLocalStorage, isAdmin, getAddUserView);
router.post("/add-user", isAuthLocalStorage, isAdmin, addUserAdmin);
router.get("/logout", isAuthLocalStorage, isAdmin, logoutAdmin);

module.exports = router;
