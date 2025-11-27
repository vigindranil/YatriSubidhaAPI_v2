import { getUserProfileDetailsModel } from "../models/userModel.js";

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
