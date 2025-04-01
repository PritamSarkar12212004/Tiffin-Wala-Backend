import { Server } from "socket.io";
import registerAuthSocket from "../events/auth/registerAuthSocket.js";
const io = new Server({
  cors: {
    origin: "*",
  },
});
const socketManager = (server) => {
  io.on("connection", (socket) => {
    registerAuthSocket(socket);
  });
};

export default socketManager;
