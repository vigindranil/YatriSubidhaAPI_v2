import pool from '../../db.js';

export async function getDepSlotBookingDetailsByLoginUserModel(StartDate, EndDate, UserID, AuthInfo) {
    try {
        const response = await pool.query(`call sp_getDepSlotBookingDetailsByLoginUser(?,?,?,?,@ErrorCode)`, [StartDate, EndDate, UserID, AuthInfo]);
        const [rows] = await pool.query("SELECT @ErrorCode AS ErrorCode");
        return response[0][0];
    } catch (error) {
        throw error;
    }
}

export async function getDepartureBookingDetailsByTokenNumberModel(TokenNo, AuthInfo) {
    try {
        const response = await pool.query(`CALL sp_getDepartureBookingDetailsByTokenNumber(?,?,@ErrorCode)`, [TokenNo, AuthInfo]);
        const [rows] = await pool.query("SELECT @ErrorCode AS ErrorCode");
        return response[0][0];
    } catch (error) {
        throw error;
    }
}

export async function getAvailableSlotByDateModel(JourneyDate, AuthInfo, Type) {
    try {
        let query = "";

        if (Type == 1) {
            query = "CALL sp_getDepartureTokenAvailability(?,?,@ErrorCode)";
        } else if (Type == 2) {
            query = "CALL sp_getArrivalTokenAvailability(?,?,@ErrorCode)";
        } else {
            throw new Error("Invalid Type. Must be 1 or 2.");
        }

        // Run stored procedure (returns multiple result sets)
        const [results] = await pool.query(query, [JourneyDate, AuthInfo]);

        // Get OUT parameter
        const [[errorRow]] = await pool.query("SELECT @ErrorCode AS ErrorCode");

        if (errorRow.ErrorCode === 0) {
            // Stored procedure first result set
            return results[0] || [];
        } else {
            return { ErrorCode: errorRow.ErrorCode };
        }

    } catch (error) {
        console.error("Error in getAvailableSlotByDate:", error);
        throw error;
    }
}
