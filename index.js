import dotenv from "dotenv";
dotenv.config();
import express from "express";
import admin from "firebase-admin";
import morgan from "morgan";
import cors from "cors";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import socketManager from "./src/socket/manager/Socketmanager.js";
import connectDB from "./src/database/DataBase.js";
import Notify from "./src/routes/notification/notifyRoute.js";

// import routes
import checkRoute from "./src/routes/check/chackRoute.js";
import otpRoute from "./src/routes/otp/otpRoute.js";
import userRoute from "./src/routes/user/userRoute.js";
import productRoutes from "./src/routes/product/productRoutes.js";
import searchEngineRoute from "./src/routes/searchEngine/searchEngineRoute.js";
import whatsappConnect from "./src/helper/whatsAppInrigate/whatsappConnect.js";

// create server
const app = express();
const server = createServer(app);

// get path of firebase file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// allow to all request
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));

// Middleware to handle JSON data
app.use(express.json());

// pass server to the socekt manager
socketManager(server);

// routes

// update check routes
app.use("/api/check", checkRoute);

// otp routes
app.use("/api/otp", otpRoute);

// user routes
app.use("/api/user", userRoute);

// product routes
app.use("/api/product", productRoutes);

// search engine routes
app.use("/api/search", searchEngineRoute);

// notification routes
app.use("/api/notify", Notify);

// Firebase config path
const serviceAccountPath = path.join(__dirname, "firebase-admin-sdk.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

// connect to the database
connectDB()
  .then(() => {
    whatsappConnect();
    // listen server
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
