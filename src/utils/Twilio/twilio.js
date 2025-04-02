import twilio from "twilio";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fixedNumber = process.env.TWILIO_FIXED_NUMBER;

// Validate Twilio credentials
if (!accountSid || !authToken || !fixedNumber) {
  console.error("Missing Twilio credentials:", {
    accountSid: !!accountSid,
    authToken: !!authToken,
    fixedNumber: !!fixedNumber
  });
  throw new Error("Twilio credentials are missing. Please check your .env file");
}

const client = twilio(accountSid, authToken);

// Function to generate a 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send OTP via Twilio
export const sendOTP = async (otp) => {
  try {
    if (!otp) {
      throw new Error("OTP is required");
    }

    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: "+12097783130", // Twilio verified number
      to: fixedNumber,
    });

    console.log("Message sent successfully:", message.sid);
    return { success: true, message: "OTP sent successfully!" };
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error(`Failed to send OTP: ${error.message}`);
  }
};
