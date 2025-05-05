import express from "express";
import async_handler from "express-async-handler";
import appUpdateCheckController from "../../controller/check/appUpdateCheckController.js";

const router = express.Router();

router.post("/app-version", async_handler(appUpdateCheckController));
export default router;
