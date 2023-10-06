import playerConfig from "../../config/player/playerConfig";

export default {
  health: {
    x: 50,
    y: 250,
    max: playerConfig.bars.health.max,
    barSprite: "health-bar",
    containerSprite: "unitBar-container",
    iconImage: "health-icon",
  },
  energy: {
    x: 120,
    y: 250,
    max: playerConfig.energy.max,
    barSprite: "energy-bar",
    containerSprite: "unitBar-container",
    iconImage: "energy-icon",
  },
  hurtScreen: {
    image: "hurt-screen",
    animEase: "Power2",
    animDuration: 200,
  },
};
