export default {
  x: 690,
  y: 1180,
  spriteID: 0,
  moveSpeed: 200,
  turnForce: 1,
  shootDelay: 1000,
  deadInvisibleDelayTime: 3000,
  startAttackRange: 500,
  type: "helicopter",
  map: {
    index: 2373,
  },
  spriteStructure: {
    top: `helicopter-sprite-0`,
    down: `helicopter-sprite-0`,
  },
  anims: {
    top: {
      idle: "helicopter-propeller-anim-0",
      attack: "helicopter-propeller-anim-0",
      dead: "helicopter-crash-0",
    },
    down: {
      idle: "helicopter-idle-0",
      move: "helicopter-idle-0",
    },
  },
  body: {
    radius: 45,
    offsetX: -20,
    offsetY: -55,
  },
  bullet: {
    damage: 10,
    attackRange: 600,
    sprite: "bullet-2",
    speed: 700,
    offset: 100,
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
    sprite: "object-destroy-sprite-0",
    visibleAtStart: false,
    offset: 0,
  },
};
