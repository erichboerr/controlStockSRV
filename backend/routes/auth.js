import express from "express";
import { login } from "../controllers/authController.js";
import { validateLogin } from "../middlewares/validateLogin.js";

const router = express.Router();
router.post("/login", validateLogin, login);

export default router;
