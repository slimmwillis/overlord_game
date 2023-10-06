import Phaser from "phaser";
import PreloadScene from "./scenes/PreloadScene";
import PlayScene from "./scenes/PlayScene";
import HudScene from "./scenes/HudScene";
import GameOverScene from "./scenes/GameOverScene";
import { GAME_WIDTH, GAME_HEIGHT } from "./config/game/gameConfig";
// import "../../css/game.css";

const config = {
  type: Phaser.AUTO,
  powerPreference: "high-performance",
  // antialias: false,
  // antialiasGL: false,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0.0 },
    },
  },

  scale: {
    mode: Phaser.Scale.FIT,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [PreloadScene, PlayScene, HudScene, GameOverScene],
};

const game = new Phaser.Game(config);
