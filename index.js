import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createServer } from "http";
import socketManager from "./src/socket/manager/Socketmanager.js";
import connectDB from "./src/database/DataBase.js";

// import routes
import otpRoute from "./src/routers/otp/otpRoute.js";
import userRoute from "./src/routers/user/userRoute.js";
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

// otp routes
app.use("/api/otp", otpRoute);

// user routes
app.use("/api/user", userRoute);

// connect to the database
connectDB()
  .then(() => {
    // listen server
    server.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
