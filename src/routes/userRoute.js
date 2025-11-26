import express from "express";
import { getUserProfileDetails } from "../controllers/userController.js";

const router = express.Router();

router.post("/get-user-profile", getUserProfileDetails);

export default router;
