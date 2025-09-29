import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.get("/register", authController.showRegister);
router.post("/register", authController.register);

router.get("/login", authController.showLogin);
router.post("/login", authController.login);

export default router;
