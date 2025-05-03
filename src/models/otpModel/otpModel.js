import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  otp: String,
  Phone_Number: String,
  otp_Created_At: {
    type: Date,
    default: Date.now,
  },
});

// Create index for auto-deletion
otpSchema.index({ otp_Created_At: 1 }, { expireAfterSeconds: 60 });

const otpModel = mongoose.model("Otp", otpSchema);

export default otpModel;
