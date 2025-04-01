import twilio from "twilio";

const accountSid = "AC3fdffbd13eb1f84408b05f24ee17267e";
const authToken = "c0afc0e9b3804fa73a16959dc3dd162d";
const client = twilio(accountSid, authToken);

const fixedNumber = "+917620876689"; // Only send to this number

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
