import express from "express";
import { getUserProfileDetails, savePassengerDetails } from "../controllers/userController.js";

const router = express.Router();

router.post("/get-user-profile", getUserProfileDetails);
router.post("/save-passenger-details", savePassengerDetails);

export default router;
