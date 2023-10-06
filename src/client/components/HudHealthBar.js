export default class HudHealthBar extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    const x = config.x;
    const y = config.y;

    super(scene, x, y);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.config = config;
    this.scene.add.existing(this);

    this.maxHealth = this.config.max;
    this.health = this.maxHealth;

    this.bar = this.createBar(0, 190);
    this.icon = this.createIcon(0, 215);
    this.barContainer = this.createBarContainer(0, 0);

    this.add([this.barContainer, this.bar, this.icon]);
  }

  createBar(x, y) {
    const sprite = this.config.barSprite;
    const bar = this.scene.add.image(x, y, sprite);
    bar.setOrigin(0.5, 1);

    return bar;
  }

  createBarContainer(x, y) {
    const sprite = this.config.containerSprite;
    const barContainer = this.scene.add.image(x, y, sprite);

    return barContainer;
  }

  createIcon(x, y) {
    const sprite = this.config.iconImage;
    const icon = this.scene.add.image(x, y, sprite);

    return icon;
  }

  updateStatus(value) {
    this.bar.displayHeight = value * this.bar.height;
  }

  // createText(x,y){
  //   const text = this.scene.add.text(
  //       x,
  //       y,
  //       "",
  //       {
  //         fontFamily: "Arial",
  //         fontSize: "30px",
  //         color: "#FF0000",
  //       }
  //     )
  //     .setOrigin(0.5)
  //     .setFontSize(60)
  //     .setText(text)
  //     .setColor(color)
  //     .setStroke("#000000")
  //     .setPadding(50, 0, 0, 0)
  //     .setWordWrapWidth(200);
  //   return text
  // }
}
