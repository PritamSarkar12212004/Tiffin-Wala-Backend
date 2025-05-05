import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createServer } from "http";
import socketManager from "./src/socket/manager/Socketmanager.js";
import connectDB from "./src/database/DataBase.js";

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
