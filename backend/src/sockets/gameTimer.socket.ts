import { Server } from "socket.io";

export function registerGameTimerSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("timer:join", ({ gameId }) => {
      socket.join(`game:${gameId}`);

      socket.emit("timer:update", {
        gameId,
        timeRemainingSeconds: 1800,
      });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}
