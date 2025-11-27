import express from "express";
import { getAvailableSlotByDate, getDepartureBookingDetailsByTokenNumber, getDepSlotBookingDetailsByLoginUser } from "../controllers/slotController.js";
const router = express.Router();

router.post("/get-available-slot-by-date", getAvailableSlotByDate);
router.post("/get-dep-slot-booking-details", getDepSlotBookingDetailsByLoginUser);
router.post("/get-departure-booking-details-by-token-number", getDepartureBookingDetailsByTokenNumber);

export default router;
