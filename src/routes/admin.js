import express from "express";
import { getDepartureCount, getAdminBookingReportDetails } from "../controllers/adminController.js";


const router = express.Router();

router.post("/arrival-departure-count", getDepartureCount);
router.post("/admin-booking-report-details", getAdminBookingReportDetails);

export default router;
