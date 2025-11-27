import pool from '../../db.js';

export async function getDepartureCountModel(FromDate, ToDate, Type, AuthInfo) {
    try {
        const response = await pool.query(`CALL sp_getArrivalDepartureBookingCount(?,?,?,?,@ErrorCode)`, [
            FromDate,
            ToDate,
            Type,
            AuthInfo
        ]);
        const [rows] = await pool.query("SELECT @ErrorCode AS ErrorCode");
        return response[0][0];
    } catch (error) {
        throw error;
    }
}
