import { generateOTPModel } from "../models/authModel.js";

export async function generateOTP(req, res) {
  try {
    if(!req){
        return res.status(400).json({ message: "Invalid request" });
    }
    const { userNameTypeID, userName, authInfo } = req.body;
    if (!userNameTypeID || !userName || !authInfo) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await generateOTPModel(userNameTypeID, userName, authInfo);
    if (!result) {
      return res
        .status(500)
        .json({ message: "Failed to generate OTP (no response from DB)" });
    }

    const { IsOTP, ErrorCode } = result;

    if (ErrorCode !== 0) {
      return res
        .status(400)
        .json({ message: "Failed to generate OTP", errorCode: ErrorCode });
    }
    if(ErrorCode === 0 && IsOTP){
        return res.status(200).json({ message: "OTP generated successfully", OTP: IsOTP });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}
