import user_key_map from "../../socketMap/user_key_map.js";
const registerAuthSocket = (io, socket) => {
  socket.on("register-user", (payload) => {
    if (payload) {
      user_key_map.set(payload, socket.id);
      console.log(`user connected  ${payload} with id socket.Id  ${socket.id}`);
    } else {
      console.log(" user id  not provided ");
    }
  });

  // disconnect the socket
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    for (const [key, value] of user_key_map.entries()) {
      if (value === socket.id) {
        user_key_map.delete(key);
        break;
      }
    }
  });
};

export default registerAuthSocket;
