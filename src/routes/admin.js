import express from "express";
import { getDepartureCount, getAdminBookingReportDetails, updateDepBookingAttendance } from "../controllers/adminController.js";


const router = express.Router();

router.post("/arrival-departure-count", getDepartureCount);
router.post("/admin-booking-report-details", getAdminBookingReportDetails);
router.post("/update-booking-attendance", updateDepBookingAttendance);

export default router;
