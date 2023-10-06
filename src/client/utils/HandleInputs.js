export default class HandleInputs {
  constructor(scene) {
    this.scene = scene;
    this.cursors = scene.input.keyboard.createCursorKeys();
    // this.keyW = scene.input.keyboard.addKey("W");
    // this.keyS = scene.input.keyboard.addKey("S");
    // this.keyA = scene.input.keyboard.addKey("A");
    // this.keyD = scene.input.keyboard.addKey("D");

    this.init();
  }

  init() {
    this.handleKeyUp();
    this.initAttackKeys();
  }

  initAttackKeys() {
    // this.scene.input.keyboard.on("keydown-SPACE", () => {
    //   // this.scene.playerShip.shoot();
    // });
    // this.keyW.on("down", () => {});
  }

  handleMovement() {
    const player = this.scene.player;

    if (this.cursors.right.isDown) {
      player.move("right");
    }

    if (this.cursors.left.isDown) {
      player.move("left");
    }

    if (this.cursors.up.isDown) {
      player.move("up");
    }

    if (this.cursors.down.isDown) {
      player.move("down");
    }
  }

  handleKeyUp() {
    this.scene.input.keyboard.on("keyup-UP", () => {
      this.onKeyUp("UP");
    });

    this.scene.input.keyboard.on("keyup-DOWN", () => {
      this.onKeyUp("DOWN");
    });

    this.scene.input.keyboard.on("keyup-RIGHT", () => {
      this.onKeyUp("RIGHT");
    });

    this.scene.input.keyboard.on("keyup-LEFT", () => {
      this.onKeyUp("LEFT");
    });
  }

  onKeyUp(key) {
    this.scene.player.playIdle();
  }
}
