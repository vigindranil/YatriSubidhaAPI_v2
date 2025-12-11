import jwt from "jsonwebtoken";

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from the "Authorization" header
        if (!token) {
            return res
                .status(401)
                .json({ message: "Access denied! Unauthorized access." });
        }
        const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
        console.log("decoded", decoded);
        // let userID = decoded?.UserID || decoded?.user_id;

        // if (userID != req.body.UserID) {
        //     return res
        //         .status(401)
        //         .json({ message: "Access denied! Invalid user." });
        // }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ status: 1, message: "Invalid or expired token." });
    }
};

export default verifyToken;
