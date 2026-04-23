import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {  upload } from "../middleware/multer.js";

const router=express.Router();

router.route("/register").post(upload.single('file'),register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile/update").post(isAuthenticated,upload.single('file'),updateProfile);

export default router;