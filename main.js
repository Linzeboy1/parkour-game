const socket = io("http://localhost:3000");
let otherPlayers = {};

let keys = {};
let currentLevel = 0;
let gameStarted = false;

let savedLevel = localStorage.getItem("level");
if (savedLevel) currentLevel = parseInt(savedLevel);

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

function startGame() {
  document.getElementById("menu").style.display = "none";
  canvas.style.display = "block";
  gameStarted = true;
  gameLoop();
}

function drawRect(x,y,w,h,color){
  ctx.fillStyle = color;
  ctx.fillRect(x,y,w,h);
}

function gameLoop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  let level = levels[currentLevel];

  updatePlayer(keys);

  // platforms
  player.grounded = false;
  level.platforms.forEach(p => {
    drawRect(p.x,p.y,p.w,p.h,"green");

    if (collision(p)) {
      player.y = p.y - player.height;
      player.velocityY = 0;
      player.grounded = true;
      player.jumps = 0;
    }
  });

// enemies 👾
level.enemies?.forEach(e => {
  // volg speler
  if (player.x < e.x) e.x -= e.speed;
  else e.x += e.speed;

  drawRect(e.x, e.y, e.size, e.size, "purple");

  if (
    player.x < e.x + e.size &&
    player.x + player.width > e.x &&
    player.y < e.y + e.size &&
    player.y + player.height > e.y
  ) {
    resetLevel();
  }
});
  // moving platforms
  level.moving.forEach(m => {
    m.x += m.dir * 2;
    if (m.x < 400 || m.x > 800) m.dir *= -1;

    drawRect(m.x,m.y,m.w,m.h,"blue");

    if (collision(m)) {
      player.y = m.y - player.height;
      player.velocityY = 0;
      player.grounded = true;
      player.jumps = 0;
    }
  });

  // spikes 💀
  level.spikes.forEach(s => {
    drawRect(s.x,s.y,s.w,s.h,"black");

    if (collision(s)) {
      resetLevel();
    }
  });

  // finish 🏁
  drawRect(level.finish.x, level.finish.y, 20, 50, "yellow");

  if (
    player.x < level.finish.x + 20 &&
    player.x + player.width > level.finish.x &&
    player.y < level.finish.y + 50 &&
    player.y + player.height > level.finish.y
  ) {
    currentLevel++;
    if (currentLevel >= levels.length) {
      alert("Je hebt gewonnen!");
      location.reload();
    } else {
      resetLevel();
    }
  }

  // speler
  drawRect(player.x, player.y, player.width, player.height, player.color);

  requestAnimationFrame(gameLoop);
}

function collision(obj) {
  return (
    player.x < obj.x + obj.w &&
    player.x + player.width > obj.x &&
    player.y < obj.y + obj.h &&
    player.y + player.height > obj.y
  );
}

function resetLevel() {
  player.x = 50;
  player.y = 300;
  player.velocityX = 0;
  player.velocityY = 0;
}
const jumpSound = document.getElementById("jumpSound");
const music = document.getElementById("music");

music.volume = 0.3;
music.play();

localStorage.setItem("level", currentLevel);
ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

socket.on("players", players => {
  for (let id in players) {
    let p = players[id];
    drawRect(p.x, p.y, 30, 30, "blue");
  }
});

// stuur jouw positie
setInterval(() => {
  socket.emit("move", { x: player.x, y: player.y });
}, 50);
socket.on("players", (players) => {
  otherPlayers = players;
});
socket.emit("move", {
  x: player.x,
  y: player.y
});
for (let id in otherPlayers) {
  let p = otherPlayers[id];

  ctx.fillStyle = "blue";
  ctx.fillRect(p.x, p.y, 30, 30);
}