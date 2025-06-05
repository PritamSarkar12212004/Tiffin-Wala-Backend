import express from "express";
import async_handler from "express-async-handler";
import marketNotifyController from "../../controller/notification/marketNotifyController.js";

const router = express.Router();

router.post("/market", async_handler(marketNotifyController));
export default router;
