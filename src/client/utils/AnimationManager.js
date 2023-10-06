import calculateRotationProperties from "../helper/calculateRotationProperties";

export default class AnimationManager extends Phaser.GameObjects.Sprite {
  constructor(scene, config) {
    const x = config.x || 0;
    const y = config.y || 0;
    const sprite = config.sprite;
    super(scene, x, y, sprite);

    this.scene = scene;
    this.sprite = sprite;
    this.config = config;
    scene.add.existing(this);
    this.offset = config.offset;

    this.setVisible(this.config.visibleAtStart);
  }

  playAnim(callback) {
    this.setVisible(true);
    this.play(this.sprite, true).once("animationcomplete", () => {
      this.setVisible(this.config.visibleAtStart);
      if (!callback) return;
      callback();
    });
  }

  playAnimAndRotate(rotation) {
    const { offsetX, offsetY } = calculateRotationProperties(
      this.offset,
      rotation
    );
    this.setPosition(offsetX, offsetY * -1);
    this.setRotation(rotation);
    this.playAnim();
  }

  playAnimWithPosition(x, y, callback) {
    this.setPosition(x, y);
    this.playAnim(callback);
  }
}
