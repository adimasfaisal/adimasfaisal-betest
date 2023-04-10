const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const userRouter = require("./user");
const authRouter = require("./auth");

router.use("/users", authMiddleware, userRouter);
router.use("/auth", authRouter);

module.exports = router;
