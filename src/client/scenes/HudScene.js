import { GAME_WIDTH, GAME_HEIGHT } from "../config/game/gameConfig";
import hudConfig from "../config/hudScene/hudSceneConfig";
import HudHealthBar from "../components/HudHealthBar";
import HurtScreen from "../components/HurtScreen";

export default class HudScene extends Phaser.Scene {
  constructor() {
    super("HudScene");
  }

  get gw() {
    return GAME_WIDTH;
  }
  get gh() {
    return GAME_HEIGHT;
  }

  update() {}

  create() {
    this.config = hudConfig;
    this.hurtScreen = this.createRedHurtScreen();
    this.healthBar = this.createHealthBar();
    this.energyBar = this.createEnergyBar();
  }

  createRedHurtScreen() {
    const config = this.config.hurtScreen;
    const hurtScreen = new HurtScreen(this, config);

    return hurtScreen;
  }

  createHealthBar() {
    const config = this.config.health;
    const healthbar = new HudHealthBar(this, config);
    return healthbar;
  }

  createEnergyBar() {
    const config = this.config.energy;
    const energybar = new HudHealthBar(this, config);
    return energybar;
  }

  updateHealthBar(value) {
    this.healthBar.updateStatus(value);
  }

  startHurtScreenAnim() {
    this.hurtScreen.handleStartAnim();
  }

  handlePlayerStatus(value) {
    this.updateHealthBar(value);
    this.startHurtScreenAnim();
  }
}
