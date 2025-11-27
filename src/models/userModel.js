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

export async function savePassengerDetailsModel(PassengerDetails) {
    try {
        const PassengerInfo = PassengerDetails.PassengerInformation;  // Already array
        let PaxDetails = [];

        for (const Passenger of PassengerInfo) {
            const sql = `CALL sp_savePassengerDetails(?,?,?,?,?,?,?,?,?,?,?,?,@PaxID,@ErrorCode)`;

            await pool.query(sql, [
                Passenger.FullName,
                Passenger.Address,
                Passenger.Nationality,
                Passenger.DOB,
                Passenger.Gender,
                Passenger.MobileNo,
                Passenger.EmailID,
                Passenger.PassportNo,
                Passenger.PassportValidUpto,
                Passenger.VisaNo,
                Passenger.VisaValidUpto,
                PassengerDetails.AuthInfo
            ]);

            const [[output]] = await pool.query(
                "SELECT @PaxID AS PaxID, @ErrorCode AS ErrorCode"
            );

            if (output.ErrorCode !== 0) {
                return { ErrorCode: output.ErrorCode };
            }

            PaxDetails.push({ PaxID: output.PaxID });
        }

        const sqlSlot = `CALL sp_saveDepartureSlotBookingDetails(?,?,?,?,?,?,@ErrorCode)`;

        const response = await pool.query(sqlSlot, [
            PassengerDetails.PrefferedSlotID,
            PassengerDetails.JourneyDate,
            JSON.stringify(PaxDetails),
            PassengerDetails.UserID,
            PassengerDetails.AuthInfo,
            PassengerDetails.Type
        ]);

        const [[output2]] = await pool.query("SELECT @ErrorCode AS ErrorCode");

        if (output2.ErrorCode === 0) {
            return response[0][0] || [];
        }

        return { ErrorCode: output2.ErrorCode };

    } catch (err) {
        console.error("savePassengerDetailsModel error:", err);
        throw err;
    }
}

