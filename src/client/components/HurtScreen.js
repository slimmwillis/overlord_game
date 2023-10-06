import { GAME_WIDTH, GAME_HEIGHT } from "../config/game/gameConfig";

export default class HurtScreen extends Phaser.GameObjects.Image {
  constructor(scene, config) {
    const image = config.image;
    const x = 0;
    const y = 0;
    super(scene, x, y, image);
    this.scene = scene;
    scene.add.existing(this);
    this.config = config;
    this.animDuration = this.config.animDuration;
    this.animEase = this.config.animEase;
    this.isActive = false;

    this.setup();
  }

  setup() {
    this.setOrigin(0.0);
    this.setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
    this.setAlpha(0);
  }

  startAnim() {
    this.scene.tweens.add({
      targets: this,
      ease: this.animEase,
      alpha: 1,
      duration: this.animDuration,
      yoyo: true,
      onComplete: () => {
        this.setActive(false);
      },
    });
  }

  handleStartAnim() {
    if (this.isActive) return;
    this.setActive(true);
    this.startAnim();
  }

  setActive(value) {
    this.isActive = value;
  }
}
