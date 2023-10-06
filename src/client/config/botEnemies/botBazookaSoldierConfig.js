export default {
  x: 1560,
  y: 1330,
  spriteID: 1,
  moveSpeed: 200,
  turnForce: 1,
  shootDelay: 1000,
  deadInvisibleDelayTime: 3000,
  startAttackRange: 500,
  type: "bazooka_soldier",
  map: {
    index: 3168,
  },
  spriteStructure: {
    top: `soldier-spritesheet-1`,
    down: `soldier-move-spritesheet-1`,
  },
  anims: {
    top: {
      idle: "soldier-idle-1",
      attack: "soldier-shoot-1",
      dead: "soldier-dead-1",
    },
    down: {
      idle: "soldier-move-idle-1",
      move: "soldier-move-1",
    },
  },
  body: {
    radius: 20,
    offsetX: -20,
    offsetY: -20,
  },
  bullet: {
    damage: 10,
    attackRange: 600,
    sprite: "bullet-2",
    speed: 700,
    offset: 30,
    startCount: 15,
    body: {
      width: 12,
      height: 12,
      offsetX: 30,
      offsetY: 30,
    },
    impactAnim: {
      x: 0,
      y: 0,
      sprite: "shoot-impact-sprite-0",
      offset: 30,
      visibleAtStart: false,
    },
  },
  health: {
    image: "tank-healthbar",
    containerImage: "tank-health-bar-container",
    max: 100,
    offsetX: 0,
    offsetY: -50,
  },
  explosionAnim: {
    x: 0,
    y: 0,
    sprite: "object-destroy-sprite-1",
    visibleAtStart: false,
    offset: 0,
  },
};
