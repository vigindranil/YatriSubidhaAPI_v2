import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY; // must match frontend key

function decryptPayload(req, res, next) {
    try {
        if (!req.body.data) {
            return res.status(400).json({ success: false, message: "Encrypted payload missing" });
        }

        // 🔐 Decrypt
        const bytes = CryptoJS.AES.decrypt(req.body.data, SECRET_KEY);
        const decryptedJSON = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedJSON) {
            return res.status(400).json({ success: false, message: "Invalid encrypted payload" });
        }

        // Convert back to object
        req.body = JSON.parse(decryptedJSON);

        next(); // go to next API
    } catch (err) {
        console.error("Decryption error:", err);
        return res.status(500).json({ success: false, message: "Decryption failed" });
    }
}

export default decryptPayload;
