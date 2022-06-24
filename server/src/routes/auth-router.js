const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth-controller");

const router = express.Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  authController.registration
);
router.post("/Login", authController.login);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);

module.exports = router;
