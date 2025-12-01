import { getAdminLoginDetailsModel, getDepartureCountModel, getDepSlotBookingDetailModel } from "../models/adminModel.js";
import jwt from "jsonwebtoken";

export async function getDepartureCount(req, res) {
    try {
        const { FromDate, ToDate, Type, AuthInfo } = req.body;

        // Validate request
        if (!FromDate || !ToDate || !Type || !AuthInfo) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        // Call Model
        const result = await getDepartureCountModel(FromDate, ToDate, Type, AuthInfo);

        // If SP returned an error code
        if (result?.ErrorCode && result.ErrorCode !== 0) {
            return res.status(400).json({
                success: false,
                message: "Database Error",
                errorCode: result.ErrorCode,
            });
        }

        // If result empty
        if (!result || result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No data found",
            });
        }

        // Success Response
        return res.status(200).json({
            success: true,
            message: "Departure count fetched successfully",
            data: result,
        });

    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}

export async function getAdminLoginDetails(req, res) {
    try {
        if (!req) {
            return res.status(400).json({ success: false, message: "Invalid request" });
        }

        const { UserName, Password, UserTypeID, AuthInfo } = req.body;

        if (!UserName, !Password, !UserTypeID, !AuthInfo) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        const result = await getAdminLoginDetailsModel(UserName, Password, UserTypeID, AuthInfo);

        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Wrong Credentials, Please check username and password",
            });
        }

        // // 🔐 Generate JWT Token (Include UserID in Payload)
        const authToken = jwt.sign(
            {
                user_id: result?.UserID,
                user_name: result?.UserName,
                user_type_id: result?.UserTypeID,
                user_full_name: result?.UserFullName,

            },                   // Payload Data
            process.env.JWT_SECRET_KEY,   // Secret Key from .env
            { expiresIn: process.env.JWT_EXPIRES_IN }           // Expiry Time
        );

        // ✅ OTP Success Response with Token
        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            data: {
                user_id: result?.UserID,
                user_name: result?.UserName,
                user_type_id: result?.UserTypeID,
                user_full_name: result?.UserFullName,
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

export async function getAdminBookingReportDetails(req, res) {
    try {
        const { FromDate, ToDate, PageNumber, Type, AuthInfo } = req.body;

        // Validate Required Fields
        if (!FromDate || !ToDate || !Type || !AuthInfo || PageNumber === undefined) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields (FromDate, ToDate, PageNumber, Type, AuthInfo required)",
            });
        }

        // Call Model - SlotID, TokenNo, PassportNo passed empty as per requirement
        const result = await getDepSlotBookingDetailModel(
            "0",          // SlotID
            "",          // TokenNo
            "",          // PassportNo
            FromDate,
            ToDate,
            PageNumber,
            Type,
            AuthInfo
        );

        // Empty Result
        if (!result || result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No booking report records found",
            });
        }

        // Success
        return res.status(200).json({
            success: true,
            message: "Booking report fetched successfully",
            data: result,
        });

    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
}