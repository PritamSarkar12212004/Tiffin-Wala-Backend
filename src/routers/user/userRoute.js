import express from "express";
import async_handler from "express-async-handler";
import profileCreateController from "../../controllers/user/profileCreateController.js";
import profileLoginController from "../../controllers/user/profileLoginController.js";
const router = express.Router();

router.post("/profile-create", async_handler(profileCreateController));
router.post("/profile-login", async_handler(profileLoginController));

export default router;
