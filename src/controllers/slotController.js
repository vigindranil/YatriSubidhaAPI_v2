import { getAvailableSlotByDateModel, getDepartureBookingDetailsByTokenNumberModel, getDepSlotBookingDetailsByLoginUserModel } from "../models/slotModel.js";


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
export async function getDepartureBookingDetailsByTokenNumber(req, res) {
  try {
    if (!req) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }
    const { TokenNo, AuthInfo } = req.body;

    if (!TokenNo || !AuthInfo) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const result = await getDepartureBookingDetailsByTokenNumberModel(TokenNo, AuthInfo);

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


export async function getAvailableSlotByDate(req, res) {
  try {
    if (!req || !req.body) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    const { JourneyDate, AuthInfo, Type } = req.body;

    // Validate Required Fields
    if (!JourneyDate || !AuthInfo || !Type) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Optional: Validate Type
    if (![1, 2].includes(Type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Type. It should be 1 (Departure) or 2 (Arrival).",
      });
    }

    // Call Model
    const result = await getAvailableSlotByDateModel(JourneyDate, AuthInfo, Type);

    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch slot availability",
      });
    }

    // If ErrorCode is returned
    if (result.ErrorCode && result.ErrorCode !== 0) {
      return res.status(400).json({
        success: false,
        message: "Procedure returned an error",
        ErrorCode: result.ErrorCode,
      });
    }

    // If result is empty
    if (Array.isArray(result) && result.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No slot data found",
        data: [],
      });
    }

    // SUCCESS
    return res.status(200).json({
      success: true,
      message: "Slot availability fetched successfully",
      data: result,
    });

  } catch (error) {
    console.error("Error in getAvailableSlotByDateController:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
