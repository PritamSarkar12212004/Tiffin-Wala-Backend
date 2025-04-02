import express from "express";
import async_handler from "express-async-handler";
import profileCreateController from "../../controllers/user/profileCreateController.js";
import profileLoginController from "../../controllers/user/profileLoginController.js";
import profileUpdateController from "../../controllers/user/profileUpdateController.js";
const router = express.Router();

router.post("/profile-create", async_handler(profileCreateController));
router.post("/profile-login", async_handler(profileLoginController));
router.post("/profile-update", async_handler(profileUpdateController));

export default router;
