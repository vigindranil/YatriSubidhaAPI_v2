import express from "express";
import { getAvailableSlotByDate, getDepSlotBookingDetailsByLoginUser } from "../controllers/slotController.js";
const router = express.Router();

router.post("/get-available-slot-by-date", getAvailableSlotByDate);
router.post("/get-dep-slot-booking-details-by-login-user", getDepSlotBookingDetailsByLoginUser);

export default router;
