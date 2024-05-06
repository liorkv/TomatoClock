const { Server } = require("socket.io");

function initWebSocket(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("message", (message) => {
      console.log(`Received message: ${message}`);
      socket.send(`Server received: ${message}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}

module.exports = initWebSocket;
