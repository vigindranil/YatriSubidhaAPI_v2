import pool from '../../db.js';

export async function generateOTPModel(userNameTypeID , userName , authInfo ){
    try{
        await pool.query(
            'CALL sp_generateOTP(?,?,?, @IsOTP, @ErrorCode)',
            [userNameTypeID, userName, authInfo]
        );

          const [rows] = await pool.query("SELECT @IsOTP AS IsOTP, @ErrorCode AS ErrorCode");

          return rows[0];
    } catch (error) {
        throw error;
    }
    
}