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


export async function getAdminLoginDetailsModel(UserName, Password, UserTypeID, AuthInfo) {
    try {
        const [rows] = await pool.query('CALL sp_getAdminLoginDetails(?,?,?,?,@ErrorCode)', [UserName, Password, UserTypeID, AuthInfo]);

        if (!rows[0][0]) {
            return null;
        }
        console.log("rows", rows);

        return rows[0][0] ?? null; // same as return $query->row()
    } catch (error) {
        console.log(error);

        throw error;
    }
}

export async function getDepSlotBookingDetailModel(
    SlotID,
    TokenNo,
    PassportNo,
    FromDate,
    ToDate,
    PageNumber,
    Type,
    AuthInfo
) {
    try {
        // Call procedure with output param @ErrorCode
        const [rows] = await pool.query(
            "CALL sp_getDepSlotBookingDetails_pagninated(?,?,?,?,?,?,?,?,@ErrorCode)",
            [FromDate, ToDate, SlotID, TokenNo, PassportNo, Type, AuthInfo, PageNumber]
        );

        if (!rows[0][0]) {
            return null;
        }
        console.log("rows", rows);

        return rows[0] ?? null;

    } catch (error) {
        console.error("Error in getDepSlotBookingDetail:", error);
        throw error;
    }
}