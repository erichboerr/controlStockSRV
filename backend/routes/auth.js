import express from "express";
import { login } from "../controllers/authController.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import { loginRateLimiter } from "../middlewares/loginRateLimiter.js";

const router = express.Router();
router.post("/login", loginRateLimiter, validateLogin, login);

export default router;
