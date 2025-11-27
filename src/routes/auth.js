import express from "express";
import { generateOTP, validateOTP } from "../controllers/authController.js";

const router = express.Router();

router.post("/generate-otp", generateOTP);
router.post("/validate-otp", validateOTP);

export default router;
