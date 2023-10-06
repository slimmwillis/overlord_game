import calculateRotationProperties from "../helper/calculateRotationProperties";
import AnimationManager from "../utils/AnimationManager";

export default class ShotManager {
  constructor(scene, config) {
    this.scene = scene;
    this.config = config;
    this.speed = this.config.speed;
    this.bulletOffset = this.config.offset;
    this.bulletsOnStartCount = this.config.startCount;
    this.attackRange = this.config.attackRange;

    this.bulletId = 0;
    this.canAttack = true;
    this.activeBullets = [];
    this.bulletsOnStart = this.createBulletsOnStart();
  }

  shootBulletFrom(playerX, playerY, rotation) {
    const { MathSinRotation, MathCosRotation, offsetX, offsetY } =
      calculateRotationProperties(this.bulletOffset, rotation);
    const x = playerX - 1 * MathCosRotation;
    const y = playerY - 1 * MathSinRotation;
    const xVelocity = MathSinRotation * this.speed;
    const yVelocity = -MathCosRotation * this.speed;

    const bullet = this.bulletsOnStart.shift();

    bullet.setActiveAndVisible(true);
    bullet.setPosition(x + offsetX, y + offsetY * -1);
    bullet.setRotation(rotation);
    bullet.move(xVelocity, yVelocity);

    this.activeBullets.push(bullet);
  }

  createBulletsOnStart() {
    const bulletsOnStart = [];
    for (let i = 0; i < this.bulletsOnStartCount; i++) {
      const bullet = this.createBullet(0, 0);
      bullet.setId(this.bulletId++);
      bullet.setActiveAndVisible(false);
      bulletsOnStart.push(bullet);
    }
    return bulletsOnStart;
  }

  createBullet(x, y) {
    const sprite = this.config.sprite;
    const bullet = new Bullet(this.scene, x, y, sprite, this.config);
    return bullet;
  }

  turnOffBullet(bullet) {
    bullet.turnOff(false);
    bullet.stopMove();
    const bIndex = this.activeBullets.findIndex((b) => b.id === bullet.id);
    const removedBullet = this.activeBullets.splice(bIndex, 1)[0];
    this.bulletsOnStart.push(removedBullet);
  }

  setCanAttack(value) {
    this.canAttack = value;
  }

  enableAttackAfterDelay(time) {
    this.scene.time.delayedCall(time, () => {
      this.canAttack = true;
    });
  }

  disableAttackForTime(time) {
    this.setCanAttack(false);
    this.enableAttackAfterDelay(time);
  }

  isDisabled() {
    return this.canAttack;
  }

  getActiveBullets() {
    return this.activeBullets;
  }

  getAttackRange() {
    return this.attackRange;
  }
}

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sprite, config) {
    super(scene, x, y, sprite);
    this.scene = scene;
    (this.x = x), (this.y = y);
    scene.add.existing(this);
    this.config = config;
    this.impactAnimOffset = this.config.impactAnim.offset;

    this.id = null;

    this.impactAnim = new AnimationManager(
      this.scene,
      this.config.impactAnim
    ).setDepth(999);

    this.addPhysicsBody();
  }

  // destroyImpactAnim() {
  //   this.impactAnim.rotation = this.rotation;
  //   const rotation = this.rotation;

  //   const MathSinRotation = Math.sin(rotation);
  //   const MathCosRotation = Math.cos(rotation);
  //   const x = this.x - 1 * MathCosRotation;
  //   const y = this.y - 1 * MathSinRotation;
  //   const offsetX = this.impactAnimOffset * MathSinRotation;
  //   const offsetY = this.impactAnimOffset * -MathCosRotation;

  //   this.impactAnim.playAnimWithPosition(x + offsetX, y + offsetY, () => {
  //     this.impactAnim.destroy();
  //   });
  // }

  setId(id) {
    this.id = id;
  }

  addPhysicsBody() {
    this.scene.physics.world.enable(this);
    this.setupBody();
  }

  setupBody() {
    const { width, height, offsetX, offsetY } = this.config.body;
    this.body.width = width;
    this.body.height = height;
    this.body.offset.y = offsetY;
    this.body.offset.x = offsetX;
  }

  playImpactAnim(x, y) {
    this.impactAnim.playAnimWithPosition(x, y);
  }

  setActiveAndVisible(value) {
    this.setVisible(value);
    this.setActive(value);
  }

  turnOff() {
    this.setActiveAndVisible(false);
    this.setupImpactAnimAndPlay();
  }

  setupImpactAnimAndPlay() {
    this.impactAnim.rotation = this.rotation;
    const rotation = this.rotation;

    const MathSinRotation = Math.sin(rotation);
    const MathCosRotation = Math.cos(rotation);
    const x = this.x - 1 * MathCosRotation;
    const y = this.y - 1 * MathSinRotation;
    const offsetX = this.impactAnimOffset * MathSinRotation;
    const offsetY = this.impactAnimOffset * -MathCosRotation;

    this.playImpactAnim(x + offsetX, y + offsetY);
  }

  move(velocityX, velocityY) {
    this.setVelocity(velocityX, velocityY);
  }

  stopMove() {
    this.setVelocity(0);
  }
}
