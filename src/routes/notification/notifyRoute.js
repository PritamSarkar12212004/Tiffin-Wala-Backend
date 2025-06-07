import express from "express";
import async_handler from "express-async-handler";
import marketNotifyController from "../../controller/notification/marketNotifyController.js";
import notiFyIdgeterController from "../../controller/notification/notiFyIdgeterController.js";
import eventNotifyController from "../../controller/notification/eventNotifyController.js";
import remindernotifyController from "../../controller/notification/remindernotifyController.js";

const router = express.Router();

router.post("/get-tokenId", async_handler(notiFyIdgeterController));
router.post("/market", async_handler(marketNotifyController));
router.post("/event", async_handler(eventNotifyController));
router.post("/remainder", async_handler(remindernotifyController));
export default router;
