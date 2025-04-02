import { Server } from "socket.io";
import registerAuthSocket from "../events/auth/registerAuthSocket.js";

const socketManager = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    registerAuthSocket(io, socket);
  });
};

export default socketManager;
