const express = require("express");
const router = express.Router();

const accountController = require("../controllers/account-controller");

router.post("/register", accountController.register);
router.post("/login", accountController.login);

router.get("/loggedin", accountController.getLoggedUser); //Get all users that the lastLogin date is more than three days

module.exports = router;
