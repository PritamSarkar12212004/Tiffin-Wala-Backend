import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const fixedNumber = process.env.TWILIO_FIXED_NUMBER; // Only send to this number

// Function to generate a 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send OTP via Twilio
export const sendOTP = async (otp) => {
  try {
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: "+12097783130", // Twilio verified number
      to: fixedNumber,
    });

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
