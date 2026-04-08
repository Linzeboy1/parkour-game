const { Server } = require("socket.io");

const io = new Server(3000, {
  cors: {
    origin: "*"
  }
});

let players = {};

io.on("connection", (socket) => {
  console.log("Player joined:", socket.id);

  players[socket.id] = { x: 50, y: 300 };

  socket.on("move", (data) => {
    players[socket.id] = data;
  });

  socket.on("disconnect", () => {
    console.log("Player left:", socket.id);
    delete players[socket.id];
  });
});

// 🔁 stuur 20x per seconde updates
setInterval(() => {
  io.emit("players", players);
}, 50);
