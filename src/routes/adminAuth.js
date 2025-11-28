import express from "express";
import { getAdminLoginDetails } from "../controllers/adminController.js";


const router = express.Router();

router.post("/get-admin-login-details", getAdminLoginDetails);

export default router;
