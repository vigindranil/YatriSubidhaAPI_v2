import { getDepartureCountModel } from "../models/adminModel.js";


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
