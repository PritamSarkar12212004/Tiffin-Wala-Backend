import express from "express";
import async_handler from "express-async-handler";
import createProductController from "../../controller/product/createProductController.js";
import fetchProductController from "../../controller/product/fetchProductController.js";
import productUpdateController from "../../controller/product/productUpdateController.js";
import deleteProductController from "../../controller/product/deleteProductController.js";
import statusProductController from "../../controller/product/statusProductController.js";
import fetchMainDataProductController from "../../controller/product/fetchMainDataProductController.js";
import likeProductController from "../../controller/product/likeProductController.js";
import likeFetchController from "../../controller/product/likeFetchController.js";
import viewsProductController from "../../controller/product/viewsProductController.js";
import profuctFilterController from "../../controller/product/profuctFilterController.js";
import top3ProductFinderController from "../../controller/product/top3ProductFinderController.js";
const router = express.Router();
router.post(
  "/fetch-mainData-product",
  async_handler(fetchMainDataProductController)
);
router.post("/create-product", async_handler(createProductController));
router.post("/views-product", async_handler(viewsProductController));
router.post("/fetch-product", async_handler(fetchProductController));
router.post("/update-product", async_handler(productUpdateController));
router.post("/delete-product", async_handler(deleteProductController));
router.post("/status-product", async_handler(statusProductController));
router.post("/like-product", async_handler(likeProductController));
router.post("/like-fetch-product", async_handler(likeFetchController));
router.post("/filter-data-product", async_handler(profuctFilterController));

router.post(
  "/filter-top-3-product",
  async_handler(top3ProductFinderController)
);
export default router;
