import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

// REGISTER
router.post("/register", AuthController.registerUser);

// LOGIN
router.post("/login", AuthController.loginUser);

export const authRoutes = router;