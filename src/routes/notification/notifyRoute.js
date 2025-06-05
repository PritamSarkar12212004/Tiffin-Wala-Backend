import express from "express";
import async_handler from "express-async-handler";
import marketNotifyController from "../../controller/notification/marketNotifyController.js";
import notiFyIdgeterController from "../../controller/notification/notiFyIdgeterController.js";

const router = express.Router();

router.post("/market", async_handler(marketNotifyController));
router.post("/get-tokenId", async_handler(notiFyIdgeterController));
export default router;
