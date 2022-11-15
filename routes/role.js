const router = require("express").Router();

/* Controllers */
// const signup = require("../controllers/authentication/signup");
const createRole = require("../controllers/role/createRole");
const isAuthenticated = require("../middlewares/isAuthenticated");
const deleteRole = require("../controllers/role/deleteRole");
const updateRole = require("../controllers/role/updateRole");
const findRoles = require("../controllers/role/findRoles");
const rolesByUserID = require("../controllers/role/rolesByUserID");

router.post("/add",isAuthenticated, createRole);
router.delete("/:id",isAuthenticated, deleteRole);
router.put("/update",isAuthenticated, updateRole);
router.get("/getAllRoles",isAuthenticated, findRoles);
router.get("/rolesByUserID",isAuthenticated,rolesByUserID);



module.exports = router;
