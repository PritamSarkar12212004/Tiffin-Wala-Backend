import otpModel from "../../models/otpModel/otpModel.js";
import { generateOTP, sendOTP } from "../../utils/Twilio/twilio.js";

const signinOtpController = async (req, res) => {
  try {
    const number = req.body.number;
    const findNumber = await otpModel.findOne({ Phone_Number: number });
    if (findNumber) {
      sendOTP(findNumber.otp);
      res.status(200).json({
        success: true,
        message: "OTP sent successfully!",
        otp: findNumber,
      });
    }
    const otp = generateOTP();
    const MainOtp = await otpModel.create({
      otp: otp,
      Phone_Number: number,
    });
    sendOTP(otp);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully!",
      otp: MainOtp,
    });
  } catch (error) {
    console.log(error);
  }
};
export default signinOtpController;
