import { getAdminLoginDetailsModel, getCurrentQueueReportModel, getDepartureCountModel, getDepSlotBookingDetailModel, getSlotWiseArrDeptBookingCountForAdminModel, getUserAuthDetailsModel, updateAdminPasswordModel, updateDepBookingAttendanceModel, updateDepSlotActiveStatusModel, updateDepSlotCapacityModel } from "../models/adminModel.js";
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

export const updateDepBookingAttendance = async (req, res) => {
    try {
        const { BookingID, AuthInfo } = req.body;

        if (!BookingID || AuthInfo === undefined) {
            return res.status(400).json({
                success: false,
                message: "Booking ID and AuthInfo are required.",
            });
        }

        // Call Model to update attendance
        const result = await updateDepBookingAttendanceModel(
            BookingID,
            AuthInfo
        );

        if (result !== 0) {
            return res.status(404).json({
                success: false,
                message: "Booking not found or attendance update failed.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Booking attendance updated successfully.",
        });

    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const getUserAuthDetails = async (req, res) => {
    try {
        const { UserID, AuthInfo } = req.body;

        if (!UserID || !AuthInfo) {
            return res.status(400).json({
                success: false,
                message: "User ID and AuthInfo are required.",
            });
        }

        // Call Model to update attendance
        const result = await getUserAuthDetailsModel(
            UserID,
            AuthInfo
        );

        console.log("result", result);

        if (result?.length == 0) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User found successfully.",
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
};

export const updateAdminPassword = async (req, res) => {
    try {
        const { UserID, PreviousPassword, NewPassword } = req.body;

        if (!UserID || !PreviousPassword || !NewPassword) {
            return res.status(400).json({
                success: false,
                message: " UserID, PreviousPassword and NewPassword are required.",
            });
        }

        // Call Model to update attendance
        const result = await updateAdminPasswordModel(UserID, PreviousPassword, NewPassword);

        if (result !== 0) {
            return res.status(404).json({
                success: false,
                message: "Old password is incorrect.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password has been updated successfully.",
        });

    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const updateDepSlotCapacity = async (req, res) => {
    try {
        const { SlotID, SlotCapacity, JourneyTypeID, AuthInfo } = req.body;

        if (!SlotID || !SlotCapacity || !JourneyTypeID || !AuthInfo) {
            return res.status(400).json({
                success: false,
                message: " SlotID, SlotCapacity, JourneyTypeID and AuthInfo are required.",
            });
        }

        // Call Model to update attendance
        const result = await updateDepSlotCapacityModel(SlotID, SlotCapacity, JourneyTypeID, AuthInfo);

        if (result !== 0) {
            return res.status(404).json({
                success: false,
                message: "Failed to update slot capacity, Please try again.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Slot capacity updated successfully.",
        });

    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const updateDepSlotActiveStatus = async (req, res) => {
    try {
        const { FromDate, ToDate, SlotID, ActiveStatus, JourneyTypeID, AuthInfo } = req.body;

        if (!FromDate || !ToDate || !SlotID || !JourneyTypeID || !AuthInfo) {
            return res.status(400).json({
                success: false,
                message: " FromDate, ToDate, SlotID, ActiveStatus and AuthInfo are required.",
            });
        }

        // Call Model to update attendance
        const result = await updateDepSlotActiveStatusModel(FromDate, ToDate, SlotID, ActiveStatus, JourneyTypeID, AuthInfo);

        if (result !== 0) {
            return res.status(404).json({
                success: false,
                message: "Failed to update slot status, Please try again.",
            });
        }

        return res.status(200).json({
            success: true,
            message: `Slot-${SlotID} ${ActiveStatus === 1 ? "activated" : "deactivated"} from ${FromDate} to ${ToDate} updated successfully.`,
        });

    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export async function getCurrentQueueReportDetails(req, res) {
    try {
        const { FromDate, ToDate, UserID } = req.body;

        // Validate Required Fields
        if (!FromDate || !ToDate || !UserID) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields (FromDate, ToDate, UserID required)",
            });
        }

        // Call Model - SlotID, TokenNo, PassportNo passed empty as per requirement
        const result = await getCurrentQueueReportModel(
            FromDate,
            ToDate,
            UserID
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

export async function getSlotWiseArrDeptBookingCountForAdmin(req, res) {
    try {
        const { FromDate, ToDate, UserID } = req.body;

        // Validate Required Fields
        if (!FromDate || !ToDate || !UserID) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields (FromDate, ToDate, UserID required)",
            });
        }

        // Call Model - SlotID, TokenNo, PassportNo passed empty as per requirement
        const result = await getSlotWiseArrDeptBookingCountForAdminModel(
            FromDate,
            ToDate,
            UserID
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