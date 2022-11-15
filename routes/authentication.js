const router = require("express").Router();

/* Controllers */
const signup = require("../controllers/authentication/signup");
const login = require("../controllers/authentication/login");
const findUsers = require("../controllers/authentication/findUsers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const deleteUser = require("../controllers/authentication/deleteUser");
const updateUser = require("../controllers/authentication/updateUser");
const findUserByRole = require("../controllers/authentication/findUserByRole");

/* Routes */
router.get("/login",login);/*----Login api */
router.post("/signup",signup);/*----registration api */
router.get("/getAllUsers",findUsers);/*---- 1. list of all users   2.list of users created at a particular date  3.list of users created between 2 datesapi */
router.put("/updateUser",isAuthenticated,updateUser);/*----Update user api */
router.delete("/deleteUser",isAuthenticated, deleteUser);/*----delete User api */
router.get("/findByRole",isAuthenticated, findUserByRole);/*----List of users for a particular role */

module.exports = router;
