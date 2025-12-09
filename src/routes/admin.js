import express from "express";
import { getDepartureCount, getAdminBookingReportDetails, updateDepBookingAttendance, getUserAuthDetails, updateAdminPassword, updateDepSlotCapacity, updateDepSlotActiveStatus, getCurrentQueueReportDetails, getSlotWiseArrDeptBookingCountForAdmin } from "../controllers/adminController.js";


const router = express.Router();

router.post("/arrival-departure-count", getDepartureCount);
router.post("/admin-booking-report-details", getAdminBookingReportDetails);
router.post("/update-booking-attendance", updateDepBookingAttendance);
router.post("/get-user-list", getUserAuthDetails);
router.post("/update-admin-password", updateAdminPassword);
router.post("/update-slot-capacity", updateDepSlotCapacity);
router.post("/update-slot-active-status", updateDepSlotActiveStatus);
router.post("/get-current-queue-report-details", getCurrentQueueReportDetails);
router.post("/get-slot-wise-arrival-departure-booking-count", getSlotWiseArrDeptBookingCountForAdmin);

export default router;
