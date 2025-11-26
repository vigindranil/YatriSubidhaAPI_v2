import express from "express";
import { getAvailableSlotByDate } from "../controllers/slotController.js";
const router = express.Router();

router.post("/get-available-slo-by-date", getAvailableSlotByDate);

export default router;
