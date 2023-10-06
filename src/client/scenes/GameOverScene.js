export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  get gw() {
    return GAME_WIDTH;
  }
  get gh() {
    return GAME_HEIGHT;
  }
  create() {
    this.background = this.createBackground();
  }

  update() {}

  createBackground() {
    this.background = this.add.image(0, 0, "bg").setOrigin(0, 0);
    // .setDisplaySize(this.gw, this.gh);
  }
}
