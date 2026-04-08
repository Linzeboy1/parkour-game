levels = [
  {
    platforms: [
      {x: 0, y: 350, w: 300, h: 20},
      {x: 400, y: 300, w: 200, h: 20}
    ],
    moving: [
      {x: 600, y: 250, w: 150, h: 20, dir: 1}
    ],
    spikes: [
      {x: 500, y: 330, w: 30, h: 20}
    ],
    finish: {x: 800, y: 200}
  },

  {
    platforms: [
      {x: 0, y: 350, w: 200, h: 20},
      {x: 300, y: 280, w: 150, h: 20}
    ],
    moving: [
      {x: 500, y: 230, w: 150, h: 20, dir: -1}
    ],
    spikes: [
      {x: 250, y: 330, w: 30, h: 20}
    ],
    finish: {x: 700, y: 180},
    enemies: [
      {x: 600, y: 300, size: 30, speed: 1}
    ]
  }
];
