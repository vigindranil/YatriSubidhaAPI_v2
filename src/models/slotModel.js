import pool from '../../db.js';

export async function getAvailableSlotByDateModel(JourneyDate, AuthInfo){
    try{
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