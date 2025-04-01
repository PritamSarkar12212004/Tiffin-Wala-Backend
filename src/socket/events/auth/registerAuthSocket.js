const registerAuthSocket = (io, socket) => {
  socket.on("register-user", (data) => {
    console.log(data);
  });
};

export default registerAuthSocket;
