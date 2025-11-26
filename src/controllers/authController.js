import { generateOTPModel, validateOTPModel } from "../models/authModel.js";

export async function generateOTP(req, res) {
  try {
    if(!req){
        return res.status(400).json({ success: false, message: "Invalid request" });
    }
    const { userNameTypeID, userName, authInfo } = req.body;
    if (!userNameTypeID || !userName || !authInfo) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const result = await generateOTPModel(userNameTypeID, userName, authInfo);
    if (!result) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to generate OTP" });
    }

    const { IsOTP, ErrorCode } = result;

    if (ErrorCode !== 0) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to generate OTP"});
    }
    if(ErrorCode === 0 && IsOTP){
        return res.status(200).json({ success: true, message: "OTP generated successfully", data: {OTP: IsOTP} });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
}

export async function validateOTP(req, res) {
  try {
    if (!req) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }

    const { userName, otp, authInfo } = req.body;

    if (!userName || !otp || !authInfo) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const result = await validateOTPModel(userName, otp, authInfo);

    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Failed to validate OTP",
      });
    }

    const { OTPStatus, OTPStatusMessage, UserID } = result; // Change as per SP return

    // ❗ If error returned by SP
    if (OTPStatus !== 0) {
      return res.status(400).json({
        success: false,
        message: OTPStatusMessage || "Invalid OTP or validation failed",
      });
    }

    // ✅ OTP correct
    if (OTPStatus === 0) {
      return res.status(200).json({
        success: true,
        message: OTPStatusMessage || "OTP validated successfully",
        data: {
          UserID
        }
      });
    }

    // ❌ Default fail response if no match
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
