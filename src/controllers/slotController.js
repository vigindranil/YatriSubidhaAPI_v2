import { getAvailableSlotByDateModel, getDepSlotBookingDetailsByLoginUserModel } from "../models/slotModel.js";


export async function getAvailableSlotByDate(req, res) {
  try {
    if (!req) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }

    const { JourneyDate, authInfo } = req.body;

    if (!JourneyDate || !authInfo) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const result = await getAvailableSlotByDateModel(JourneyDate, authInfo);

    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch slot availability" });
    }

    if (result.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No available slot for this date", data: null });
    }

    // Success
    return res.status(200).json({
      success: true,
      message: "Slot availability fetched successfully",
      data: result
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
}

export async function getDepSlotBookingDetailsByLoginUser(req, res) {
  try {
    if (!req) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }
    const { StartDate, EndDate, UserID, authInfo } = req.body;

    if (!StartDate || !EndDate || !UserID || !authInfo) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const result = await getDepSlotBookingDetailsByLoginUserModel(StartDate, EndDate, UserID, authInfo);

    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch booking details" });
    }
    if (result.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No booking details found", data: null });
    }
    // Success
    return res.status(200).json({
      success: true,
      message: "Booking details fetched successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
}