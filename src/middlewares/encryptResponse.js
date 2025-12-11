import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY; // must match frontend key


function encrypt(data) {
    const json = JSON.stringify(data);
    return CryptoJS.AES.encrypt(json, SECRET_KEY).toString();
}

export default function encryptResponse(req, res, next) {
    const oldJson = res.json;

    // Override res.json
    res.json = function (data) {
        try {
            const encrypted = encrypt(data);

            return oldJson.call(res, { data: encrypted });
        } catch (err) {
            console.error("❌ Encryption Error:", err);
            const encrypted = encrypt({ success: false, message: "Response encryption failed, Data tempered or encryption failed" });
            return oldJson.call(res, { data: encrypted });
        }
    };

    next();
};