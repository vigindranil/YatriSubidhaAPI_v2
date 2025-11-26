import express from "express";
import { generateOTP, validateOTP } from "../controllers/authController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Auth route working!");
});

router.post("/generate-otp", generateOTP);
router.post("/validate-otp", validateOTP);

export default router;
