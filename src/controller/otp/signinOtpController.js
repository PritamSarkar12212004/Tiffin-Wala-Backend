import otpModel from "../../model/otpModel/otpModel.js";
import { generateOTP } from "../../utils/Twilio/twilio.js";
import { client } from "../../helper/whatsAppInrigate/whatsappConnect.js";
import whatsappIntrigateFunc from "../../helper/whatsappIntrigateFunc/whatsappIntrigateFunc.js";
import userModel from "../../model/userModel/userModel.js";
const signinOtpController = async (req, res) => {
  try {
    const number = req.body.number;

    if (!number) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const fineUser = await userModel.findOne({ User_Phone_Number: number });
    if (fineUser) {
      const findOtp = await otpModel.findOne({ Phone_Number: number });
      if (findOtp) {
        try {
          await whatsappIntrigateFunc(client, number, findOtp.otp, "Login");
          return res.status(200).json({
            success: true,
            message: "OTP sent successfully!",
            data: {
              phoneNumber: findOtp.Phone_Number,
              otp: findOtp.otp,
            },
          });
        } catch (error) {
          console.error("WhatsApp error:", error);
          return res.status(500).json({
            success: false,
            message: "Failed to send OTP via WhatsApp",
            error: error.message,
          });
        }
      }
      // Generate new OTP for new number
      const otp = generateOTP();
      const MainOtp = await otpModel.create({
        otp: otp,
        Phone_Number: number,
      });

      try {
        await whatsappIntrigateFunc(client, number, otp, "Login");
        return res.status(200).json({
          success: true,
          message: "OTP sent successfully!",
          data: {
            phoneNumber: MainOtp.Phone_Number,
            otp: MainOtp.otp,
          },
        });
      } catch (error) {
        console.error("WhatsApp error:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to send OTP via WhatsApp",
          error: error.message,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "User not found please signup",
      });
    }
  } catch (error) {
    console.error("Error in signinOtpController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default signinOtpController;
