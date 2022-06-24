const express = require("express");
const authRouter = require("./auth-router");
const usersRouter = require("./user-router");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);

module.exports = router;
