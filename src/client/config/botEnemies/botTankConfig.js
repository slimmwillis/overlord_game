export default {
  x: 1260,
  y: 1330,
  spriteID: 0,
  moveSpeed: 200,
  turnForce: 1,
  shootDelay: 1000,
  deadInvisibleDelayTime: 3000,
  startAttackRange: 500,
  type: "tank",
  map: {
    index: 3020,
  },
  spriteStructure: {
    top: `tank-sprite-0`,
    down: `tank-sprite-0`,
  },
  anims: {
    top: {
      idle: "tank-gun-idle-anim-0",
      attack: "tank-gun-attack-anim-0",
      dead: "tank-crash-anim-0",
    },
    down: {
      idle: "tank-body-idle-anim-0",
      move: "tank-move-anim-0",
    },
  },
  body: {
    radius: 55,
    offsetX: -55,
    offsetY: -50,
  },
  bullet: {
    damage: 10,
    attackRange: 600,
    sprite: "bullet-1",
    speed: 700,
    offset: 130,
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
