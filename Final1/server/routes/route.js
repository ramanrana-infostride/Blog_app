import express from "express";

import { createPost,getAllPosts } from "../controllers/post-controller.js";

import { uploadImage, getImage } from "../controllers/image-controller.js";

import { loginUser, signupUser } from "../controllers/user_controller.js";
import { authenticateToken } from "../controllers/jwt-controller.js";

import upload from "../utils/upload.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);

router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);

router.post("/create", authenticateToken, createPost);
router.get("/posts", authenticateToken, getAllPosts);




export default router;
