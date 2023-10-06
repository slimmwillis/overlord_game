import Bot from "./Bot";

export default class Tank extends Bot {
  constructor(scene, config) {
    super(scene, config);
    this.scene = scene;

    //! /////////////////////////////////
    // this.scene.time.addEvent({
    //   delay: 100,
    //   callback: () => this.handleShoot(),
    //   loop: true,
    // });
    //! /////////////////////////////////
  }

  //   update() {
  //     if (!this.isAlive) return;
  //     this.updateHealthBarPosition();
  //     this.moveRight();
  //   }

  handleShoot(x, y) {
    if (!this.isAlive) return;
    if (!this.isInAttackRange(x, y)) return;
    this.handleRotation(x, y);
    if (!this.canShootAttack()) return;
    this.shoot();
    this.playShootAnim(() => {
      this.playIdleAnims();
    });
  }
}
