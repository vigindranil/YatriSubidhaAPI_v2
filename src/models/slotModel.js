import pool from '../../db.js';

export async function getAvailableSlotByDateModel(JourneyDate, AuthInfo) {
    try {
        const response = await pool.query(
            'CALL sp_getDepartureTokenAvailability(?,?,@ErrorCode)',
            [JourneyDate, AuthInfo]
        );

        const [rows] = await pool.query("SELECT @ErrorCode AS ErrorCode");

        console.log(response[0][0]);

        return response[0][0];
    } catch (error) {
        throw error;
    }

}

export async function getDepSlotBookingDetailsByLoginUserModel(StartDate, EndDate, UserID, AuthInfo) {
    try {
        const response = await pool.query(`call sp_getDepSlotBookingDetailsByLoginUser(?,?,?,?,@ErrorCode)`, [StartDate, EndDate, UserID, AuthInfo]);
        const [rows] = await pool.query("SELECT @ErrorCode AS ErrorCode");
        return response[0][0];
    } catch (error) {
        throw error;
    }
}