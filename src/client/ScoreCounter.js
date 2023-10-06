class ScoreCounter extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, style) {
    super(scene, x, y, text, style);

    scene.add.existing(this);

    this.titleText = text;
    this.numberText = 0;
    this.setText(this.titleText + this.numberText);
  }

  updateScore(value) {
    const newText = (this.numberText += value);
    this.setText(this.titleText + newText);
  }
}
