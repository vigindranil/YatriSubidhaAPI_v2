import axios from "axios";
import https from "https";
import crypto from "crypto";

export const sendSMSInternally = async (
    smstext,
    mobileNumber,
    smsCategory = "N/A",
    tpid
) => {
    const BartaBaseURL = "http://barta.wb.gov.in/send_sms_ites_webel.php?";
    const extra = "";
    const passkey = "sms_webel_ites_5252_@$#";

    try {
        const numbers = encodeURIComponent(mobileNumber);
        const message = encodeURIComponent(smstext);
        const passkeyNew = encodeURIComponent(passkey);

        const url = `${BartaBaseURL}mobile=${numbers}&message=${message}&templateid=${tpid}&extra=${extra}&passkey=${passkeyNew}`;

        const response = await axios.post(
            url,
            {},
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                httpsAgent: new https.Agent({
                    secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
                }),
            }
        );

        if (response.status == 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        // console.log("Exception:", error.message);
        return false;
    }
};