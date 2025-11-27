import express from "express";
import { getDepartureCount } from "../controllers/adminController.js";


const router = express.Router();

router.post("/get-departure-count", getDepartureCount);

export default router;
