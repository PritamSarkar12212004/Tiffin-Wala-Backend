import otpModel from "../../model/otpModel/otpModel.js";
import userModel from "../../model/userModel/userModel.js";
import { generateOTP } from "../../utils/Twilio/twilio.js";
import { client } from "../../helper/whatsAppInrigate/whatsappConnect.js";
import whatsappIntrigateFunc from "../../helper/whatsappIntrigateFunc/whatsappIntrigateFunc.js";

const signupOtpController = async (req, res) => {
  try {
    const { number } = req.body;

    // Validate phone number
    if (!number) {
      console.log("Phone number is required");
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
        data: null,
      });
    }

    // Check if number exists
    const existingNumber = await userModel.findOne({
      User_Phone_Number: number,
    });
    if (existingNumber) {
      console.log("Number already exists");
      return res.status(400).json({
        success: false,
        message: "Number already exists please signin",
        data: null,
      });
    }

    // Generate and save new OTP
    const otp = generateOTP();
    const newOtp = await otpModel.create({
      otp,
      Phone_Number: number,
    });

    // Send OTP via WhatsApp
    await whatsappIntrigateFunc(client, number, otp, "Signup");

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully!",
      data: {
        phoneNumber: newOtp.Phone_Number,
        otp: newOtp.otp,
      },
    });
  } catch (error) {
    console.error("Error in signupOtpController:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process signup request",
      error: error.message,
      data: null,
    });
  }
};

export default signupOtpController;
