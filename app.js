const io = require("socket.io")(3000, {
  cors: { origin: "*" }
});

let players = {};

io.on("connection", socket => {
  players[socket.id] = { x: 50, y: 300 };

  socket.on("move", data => {
    players[socket.id] = data;
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
  });

  setInterval(() => {
    socket.emit("players", players);
  }, 50);
});