import express from "express";
import async_handler from "express-async-handler";
import profileCreateController from "../../controller/user/profileCreateController.js";
import profileLoginController from "../../controller/user/profileLoginController.js";
import profileUpdateController from "../../controller/user/profileUpdateController.js";
import LocationUpdate from "../../controller/user/LocationUpdate.js";
import fetchUserDataController from "../../controller/user/fetchUserDataController.js";
const router = express.Router();

router.post("/fetch-userData", async_handler(fetchUserDataController));
router.post("/profile-create", async_handler(profileCreateController));
router.post("/profile-login", async_handler(profileLoginController));
router.post("/profile-update", async_handler(profileUpdateController));
router.post("/location-update", async_handler(LocationUpdate));

export default router;
