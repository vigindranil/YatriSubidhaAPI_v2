import pool from '../../db.js';

export async function generateOTPModel(userNameTypeID , userName , authInfo ){
    try{
        await pool.query(
            'CALL sp_generateOTP_Test(?,?,?, @IsOTP, @ErrorCode)',
            [userNameTypeID, userName, authInfo]
        );

          const [rows] = await pool.query("SELECT @IsOTP AS IsOTP, @ErrorCode AS ErrorCode");

          return rows[0];
    } catch (error) {
        throw error;
    }
    
}

export async function validateOTPModel(UserName, OTP, AuthInfo) {
    try {
        const [rows] = await pool.query('CALL sp_validateOTP_Test(?,?,?)', [UserName, OTP, AuthInfo]);

        console.log(rows[0]);
        
        return rows[0][0] ?? null; // same as return $query->row()
    } catch (error) {
        throw error;
    }
}
