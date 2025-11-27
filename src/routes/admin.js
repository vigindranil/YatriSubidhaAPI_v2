import express from "express";
import { getDepartureCount } from "../controllers/adminController.js";


const router = express.Router();

router.post("/get-arrival-departure-count", getDepartureCount);

export default router;
