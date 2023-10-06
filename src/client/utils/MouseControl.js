export default class MouseControl {
  constructor(scene) {
    this.scene = scene;

    this.addEvents();
  }

  addEvents() {
    this.scene.input.on("pointerdown", (pointer) => {
      this.scene.playerShootAttack();
    });
  }
}
