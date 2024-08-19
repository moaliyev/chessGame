import express from "express";
import { AuthController } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", AuthController.signUpController);
router.post("/login", AuthController.loginController);
router.post("/logout", AuthController.logoutController);

export default router;
