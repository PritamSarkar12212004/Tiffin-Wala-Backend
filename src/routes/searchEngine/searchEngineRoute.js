import express from "express";
import async_handler from "express-async-handler";
import searchEngineController from "../../controller/searchEngine/searchEngineController.js";
const router = express.Router();
router.post("/main-engine", async_handler(searchEngineController));
export default router;
