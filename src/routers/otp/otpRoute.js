import express from "express";
import async_handler from "express-async-handler";
import signupOtpController from "../../controllers/otp/signupOtpController.js";
import signinOtpController from "../../controllers/otp/signInOtpController.js";
const router = express.Router();
router.post("/signup", async_handler(signupOtpController));
router.post("/signin", async_handler(signinOtpController));
router.post("/web-js", async_handler(signinOtpController));
export default router;
