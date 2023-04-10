const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/create", userController.createUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.get("/account/:accountNumber", userController.getUserByAccountNumber); //Get account info by AccountNumber
router.get(
  "/registration/:registrationNumber",
  userController.getUserByRegistrationNumber
); //Get account info by RegistrationNumber
router.get("/detail/me", userController.checkLoggedUser);

module.exports = router;
