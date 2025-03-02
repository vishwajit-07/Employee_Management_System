import express from "express";
import { check } from "express-validator";
import { register, login, logout } from "../controllers/authController.js";

const router = express.Router();

// Register Route
router.post(
  "/register",
  [
    check("email", "Valid email is required").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  register
);

// Login Route
router.post(
  "/login",
  [
    check("email", "Valid email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  login
);

router.post("/logout",logout);
export default router;
