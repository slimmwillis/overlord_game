import Bot from "./Bot";
// import AnimationManager from "../utils/AnimationManager";

export default class Helicopter extends Bot {
  constructor(scene, config) {
    super(scene, config);
    this.scene = scene;

    this.setDepth(998);
    this.setupDestroyAnim();

    //! /////////////////////////////////
    // this.scene.time.addEvent({
    //   delay: 100,
    //   callback: () => this.handleShoot(),
    //   loop: true,
    // });
    //! /////////////////////////////////
  }

  update() {
    if (!this.isAlive) return;
    this.updateHealthBarPosition();

    // this.moveRight();
  }

  setupDestroyAnim() {
    this.destroyAnim.setScale(1.7);
  }

  startSmallerSizeAnim(callback) {
    this.scene.tweens.add({
      targets: this,
      ease: "Circ.in",
      scale: 0.6,
      duration: 1500,
      onComplete: () => {
        callback();
      },
    });
  }

  kill() {
    this.disablePhysicsBody();
    this.setIsAlive(false);
    this.healthBar.setVisible(false);
    this.playDestroyAnim();
    this.startSmallerSizeAnim(() => this.playDestroyAnim());
    this.stopAnims();
    this.playDeadAnim(() => {
      this.makeInvisibleWithDelay(this.config.deadInvisibleDelayTime);
      this.playDestroyAnim();
      this.stopAnims();
    });
  }

  handleShoot(x, y) {
    if (!this.isAlive) return;
    if (!this.isInAttackRange(x, y)) return;
    this.handleRotation(x, y);
    if (!this.canShootAttack()) return;
    this.shoot();
  }
}
