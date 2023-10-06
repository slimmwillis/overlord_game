import mousePointerConfig from "../config/mousePointer/mousePointerConfig";

export default class MousePointerManager {
  constructor(scene) {
    this.scene = scene;
    this.config = mousePointerConfig;
    this.image = this.config.image;
    scene.add.existing(this);
    this.autoStart = this.config.autoStart;
    this.imageWidth = this.config.imageWidth;
    this.imagePath = this.config.path;

    if (!this.autoStart) return;
    this.scene.input.setDefaultCursor(
      `url(${this.imagePath}${this.image}.png) ${this.imageWidth} ${this.imageWidth}, pointer`
    );

    // this.setupOnStart();
  }

  restoreDefaultPointer() {
    this.scene.input.setDefaultCursor("auto");
  }

  changePointerOnImage() {
    this.scene.input.setDefaultCursor(
      `url(${this.imagePath}${this.image}.png) ${this.imageWidth} ${this.imageWidth}, pointer`
    );
  }

  //   setupOnStart() {
  //     if (!this.autoStart) return;
  //     this.changePointerOnImage();
  //   }

  //   update() {
  //     if (!this.autoStart) return;
  //     // this.updateImagePositionWithMousePointer();
  //   }

  //   offDefaultPointer() {
  //     this.scene.input.manager.canvas.style.cursor = "none";
  //   }

  //   //   startFollowCustomPointerWithPointerMoue() {
  //   //     this.scene.input.on(
  //   //       "pointermove",
  //   //       function (pointer) {
  //   //         // console.log(pointer.x);
  //   //         this.x = pointer.x + this.scene.cameras.main.scrollX;
  //   //         this.y = pointer.y + this.scene.cameras.main.scrollY;
  //   //       },
  //   //       this
  //   //     );
  //   //   }

  //   updateImagePositionWithMousePointer() {
  //     const { x, y } = this.getMousePointerPosition();

  //     this.setPosition(x, y);
  //   }

  //   getMousePointerPosition() {
  //     const pointer = this.scene.input.activePointer;
  //     const x = pointer.x + this.scene.cameras.main.scrollX;
  //     const y = pointer.y + this.scene.cameras.main.scrollY;

  //     return { x, y };
  //   }

  //   //   changeMousePointer() {
  //   //     this.offDefaultPointer();
  //   //     this.startFollowCustomPointerWithPointerMoue();
  //   //   }

  //   start(value) {
  //     this.autoStart = value;
  //   }

  //   setupOnStart() {
  //     if (!this.offDefaultPointer) return;
  //     this.offDefaultPointer();
  //   }

  //   // anim(){
  //   //     viewfinderAnim() {
  //   //         this.tweens.add({
  //   //           targets: this.viewfinder,
  //   //           scale: 1.5,
  //   //           duration: 100,
  //   //           yoyo: true,
  //   //         });
  //   //       }
  //   // }
}
