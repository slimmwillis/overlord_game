import Entity from "./Entity";
import collisionHandler from "../helper/collisionHandler";

export default class Enemy extends Entity {
  constructor(scene, config) {
    super(scene, config);
    this.scene = scene;

    this.test = false;
  }

  update() {
    this.tankBars.setPosition(this.x, this.y);

    // this.rotateGunTowardMousePointer(
    //   this.gunImage,
    //   this.config.gun.rotateSpeed
    // );

    // this.setTankBarsPosition(this.x, this.y);
    // if (this.test) return;
    // this.scene.time.addEvent({
    //   delay: 1000,
    //   callback: () => this.handleShoot(),
    //   loop: true,
    // });
    // this.test = true;
  }

  setRotate(targetX, targetY) {
    const targetAngle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      targetX,
      targetY
    );

    const angleDifference = targetAngle - this.rotation;

    const additionalRotation = Phaser.Math.DegToRad(-90);
    const rotationStep =
      Phaser.Math.Angle.Wrap(angleDifference) + additionalRotation;

    this.rotation += rotationStep;
  }

  handleRotation(targetX, targetY) {
    if (!this.isAlive) return;
    this.setRotate(targetX, targetY);
  }

  handleShoot(x, y) {
    if (!this.isAlive) return;
    if (!this.isInAttackRange(x, y)) return;
    if (!this.canShootAttack()) return;
    if (this.tankBars.isAmmoBarAmmoImagesEmpty()) {
      this.tankBars.handleReloadAmmoImages();
      return;
    }
    this.shoot();
    this.moveBackGunTween();
  }

  isInAttackRange(x, y) {
    const target = { x, y };
    const offset = 500;
    return !collisionHandler(target, this, offset);
  }
}
