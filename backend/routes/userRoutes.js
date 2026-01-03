import express from "express";
import {
    clerkSync,
    getUser,
    login,
    logout,
    register,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.post("/clerk-sync", clerkSync);

export default router;
