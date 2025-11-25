import pool from '../../db.js';

export async function getUserProfileDetailsModel(userId) {
    try {
      
      const [rows] = await pool.query('CALL sp_getUserProfileDetails(?)', [userId]);
      return rows[0]; 
    } catch (error) {
      throw new Error('Database error: ' + error.message);
    }
  }