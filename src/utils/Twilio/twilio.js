import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const accountSid = "AC3fdffbd13eb1f84408b05f24ee17267e";
const authToken = "feb0b2a7988ffe5df7d69210d720e6c6";
const client = twilio(accountSid, authToken);

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTP = async (otp) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: "+12097783130",
      to: "+917620876689",
    });

    console.log("OTP sent:", message.sid);
    return { success: true, message: "OTP sent successfully!" };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return {
      success: false,
      message: "Error sending OTP",
      error: error.message,
    };
  }
};
