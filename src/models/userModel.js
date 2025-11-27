import pool from '../../db.js';

export async function getUserProfileDetailsModel(UserID){
    try{
        const response = await pool.query(
            'CALL sp_getUserProfileDetails(?)',
            [UserID]
        );

          console.log(response[0][0]);
          
          return response[0][0];
    } catch (error) {
        throw error;
    }
    
}