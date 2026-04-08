jumpSound.currentTime = 0;
jumpSound.play();

let player = {
  x: 50,
  y: 300,
  width: 30,
  height: 30,
  velocityX: 0,
  velocityY: 0,
  speed: 0.6,
  jumpPower: -12,
  grounded: false,
  jumps: 0,
  maxJumps: 2, // 🔥 dubbele sprong
  color: "red"
};

function updatePlayer(keys) {
  if (keys["ArrowRight"]) player.velocityX += player.speed;
  if (keys["ArrowLeft"]) player.velocityX -= player.speed;

  if (keys["Space"] && player.jumps < player.maxJumps) {
    player.velocityY = player.jumpPower;
    player.jumps++;
    keys["Space"] = false;
  }

  player.velocityY += 0.6;
  player.velocityX *= 0.8;

  player.x += player.velocityX;
  player.y += player.velocityY;
  jumpSound.currentTime = 0;
jumpSound.play();

}