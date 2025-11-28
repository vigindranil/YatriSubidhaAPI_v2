import { generateOTPModel, validateOTPModel } from "../models/authModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function generateOTP(req, res) {
  try {
    if (!req) {
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

    if (userNameTypeID == 1) {
      return res.status(400).json({ success: false, message: "Mobile number based login is currently disabled" });
    } else {
      // 🔧 Setup Mail Transporter
      // const transporter = nodemailer.createTransport({
      //   host: process.env.MAIL_HOST,       // smtp.gmail.com / your smtp host
      //   port: process.env.MAIL_PORT,       // 465 (secure) / 587 (TLS)
      //   secure: true,                     // true for 465, false for 587/others
      //   auth: {
      //     user: process.env.MAIL_USER,     // email address
      //     pass: process.env.MAIL_PASS      // app password / smtp password
      //   },
      //   tls: {
      //     rejectUnauthorized: false
      //   }
      // });

      // const mailOptions = {
      //   from: `Team YatriSubidha`,
      //   to: userName,                      // user email
      //   subject: "Yatri Subidha Portal",
      //   html: `
      //     <h2>Login Verification Code</h2>
      //     <p>Your OTP for login is:</p>
      //     <h1 style="color:#3085ee">${IsOTP}</h1>
      //     <p>This OTP is valid for 5 minutes.</p>
      //     <br>
      //     <p>Regards,<br>Land Ports Authority of India</p>
      //   `
      // };

      // await transporter.sendMail(mailOptions);
    }

    if (ErrorCode !== 0) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to generate OTP" });
    }
    if (ErrorCode === 0 && IsOTP) {
      return res.status(200).json({ success: true, message: "OTP generated successfully", data: { OTP: IsOTP } });
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

    const { OTPStatus, OTPStatusMessage, UserID } = result;

    // ❗ OTP Failed
    if (OTPStatus !== 0) {
      return res.status(400).json({
        success: false,
        message: OTPStatusMessage || "Invalid OTP or validation failed",
      });
    }

    // 🔐 Generate JWT Token (Include UserID in Payload)
    const authToken = jwt.sign(
      { UserID },                   // Payload Data
      process.env.JWT_SECRET_KEY,   // Secret Key from .env
      { expiresIn: process.env.JWT_EXPIRES_IN }           // Expiry Time
    );

    // ✅ OTP Success Response with Token
    return res.status(200).json({
      success: true,
      message: OTPStatusMessage || "OTP validated successfully",
      data: {
        UserID,
        authToken,
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
