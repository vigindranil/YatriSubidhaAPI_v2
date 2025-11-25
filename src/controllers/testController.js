import { getUserProfileDetailsModel } from "../models/testModel";

export const getUserProfileDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        status: 1,
        message: 'Invalid parameter',
      });
    }

    const result = await getUserProfileDetailsModel(userId);

    if (result.length > 0) {
    
      return res.status(200).json({
        status: 0,
        message: 'Data fetched successfully',
        data: result,
      });
    } else {
      
      return res.status(404).json({
        status: 1,
        message: 'No records found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 1,
      message: 'Internal server error',
      error: error.message,
    });
  }
};