import { getUserProfileDetailsModel, savePassengerDetailsModel } from "../models/userModel.js";

export async function getUserProfileDetails(req, res) {
  try {
    if (!req) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }
    const { UserID } = req.body;
    if (!UserID) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const result = await getUserProfileDetailsModel(UserID);

    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch User Profile Details" });
    }
    return res.status(200).json({
      success: true,
      message: "User Profile Details fetched successfully",
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

export async function savePassengerDetails(req, res) {
  try {
    if (!req) {
      return res.status(400).json({
        success: false,
        message: "Invalid request"
      });
    }

    const {
      PrefferedSlotID,
      JourneyDate,
      PassengerInformation,
      AuthInfo,
      UserID,
      Type
    } = req.body;

    // ====== Validation ======
    if (!PrefferedSlotID || !JourneyDate || !PassengerInformation || !AuthInfo || !UserID || !Type) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Build object to pass to model
    const passengerDetailsObj = {
      PrefferedSlotID,
      JourneyDate,
      PassengerInformation,
      AuthInfo,
      UserID,
      Type
    };

    // ====== Call Model ======
    const result = await savePassengerDetailsModel(passengerDetailsObj);

    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Failed to save passenger booking details"
      });
    }

    // If stored procedure returned an error code
    if (result.ErrorCode) {
      return res.status(400).json({
        success: false,
        message: "Database error while saving passenger details",
        errorCode: result.ErrorCode,
      });
    }

    // ====== Success ======
    return res.status(200).json({
      success: true,
      message: "Passenger slot booking saved successfully",
      data: result
    });

  } catch (error) {
    console.error("savePassengerDetails Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
}


