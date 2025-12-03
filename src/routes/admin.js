import express from "express";
import { getDepartureCount, getAdminBookingReportDetails, updateDepBookingAttendance, getUserAuthDetails } from "../controllers/adminController.js";


const router = express.Router();

router.post("/arrival-departure-count", getDepartureCount);
router.post("/admin-booking-report-details", getAdminBookingReportDetails);
router.post("/update-booking-attendance", updateDepBookingAttendance);
router.post("/get-user-list", getUserAuthDetails);
router.post("/update-admin-password", updateAdminPassword);

export default router;
