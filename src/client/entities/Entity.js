import tankStructureConfig from "../config/player/tankStructureConfig";
import calculateRotationProperties from "../helper/calculateRotationProperties";
import AnimationManager from "../utils/AnimationManager";
import TankBars from "../components/TankBarsLabel";
import ShotManager from "../combat/Shooting";

export default class Entity extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    const x = config.x;
    const y = config.y;

    super(scene, x, y);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.config = config;
    this.scene.add.existing(this);
    this.spriteID = this.config.spriteID;
    this.speed = this.config.speed;
    this.trackOffsetX = this.config.trackAnim.offsetX;
    this.shootDelay = this.config.shootDelay;
    this.turnForce = this.config.turnForce;
    this.bulletDamage = this.config.bullet.damage;
    this.canAttack = true;
    this.isAlive = true;

    this.bodyImage = this.createBody(0, 0);
    this.gunImage = this.createGun(0, 0);
    this.leftTrackImage = this.createLeftTrack();
    this.rightTrackImage = this.createRightTrack();
    this.shootAnim = this.createShootAnim();
    this.destroyAnim = this.createDestroyAnim();
    this.tankBars = this.createTankBars();

    this.add([
      this.leftTrackImage,
      this.rightTrackImage,
      this.bodyImage,
      this.gunImage,
      this.shootAnim,
      this.destroyAnim,
    ]);

    this.addPhysics();
    this.shootingAbility = this.createShootingAbility();
  }

  update() {
    if (!this.isAlive) return;
    this.rotateGunTowardMousePointer(
      this.gunImage,
      this.config.gun.rotateSpeed
    );
    this.setTankBarsPosition(this.x, this.y);
  }

  createBody(x, y) {
    const sprite = tankStructureConfig.body(this.spriteID);
    const body = this.scene.add.image(x, y, sprite).setOrigin(0.5, 0.5);

    return body;
  }

  createGun(x, y) {
    const sprite = tankStructureConfig.gun(this.spriteID);
    const gun = this.scene.add.image(x, y, sprite).setOrigin(0.5, 0.5);

    return gun;
  }

  createLeftTrack() {
    const config = this.config.trackAnim;
    const track = new AnimationManager(this.scene, config);
    track.x = -track.x;

    return track;
  }

  createRightTrack() {
    const config = this.config.trackAnim;
    const track = new AnimationManager(this.scene, config);

    return track;
  }

  createShootAnim() {
    const config = this.config.shootAnim;
    const anim = new AnimationManager(this.scene, config);

    return anim;
  }

  addPhysics() {
    this.scene.physics.world.enableBody(this);
    // this.body.setCollideWorldBounds(true);
    this.body.allowGravity = false;
    this.body.immovable = false;
    this.setUpPhysicBody();
  }

  setUpPhysicBody() {
    const { radius, offsetX, offsetY } = this.config.body;

    this.body.setCircle(radius);
    this.body.offset.x = offsetX;
    this.body.offset.y = offsetY;
  }

  moveRight() {
    this.playTrucksAnim();
    this.angle += this.turnForce;
  }

  moveLeft() {
    this.playTrucksAnim();
    this.angle -= this.turnForce;
  }

  moveUp() {
    this.playTrucksAnim();
    this.setBodyVelocity(1, -1);
  }

  moveDown() {
    this.playTrucksAnim();
    this.setBodyVelocity(-1, 1);
  }

  setBodyVelocity(signX, signY) {
    const { offsetX, offsetY } = calculateRotationProperties(
      this.speed,
      this.rotation
    );
    const velocityX = signX * offsetX;
    const velocityY = signY * offsetY;

    this.body.setVelocity(velocityX, velocityY);
  }

  playIdle() {
    this.body.setVelocity(0);
  }

  playTrucksAnim() {
    this.leftTrackImage.playAnim();
    this.rightTrackImage.playAnim();
  }

  getShootAttackRange() {
    return this.shootingAbility.getAttackRange();
  }

  handleShoot() {
    if (!this.isAlive) return;
    if (!this.canShootAttack()) return;
    if (this.tankBars.isAmmoBarAmmoImagesEmpty()) {
      this.tankBars.handleReloadAmmoImages();
      return;
    }
    this.shoot();
  }

  shoot() {
    this.tankBars.updateAmmoBar();
    this.shootingAbility.disableAttackForTime(this.shootDelay);
    this.shootAnim.playAnimAndRotate(this.gunImage.rotation);
    this.shootingAbility.shootBulletFrom(
      this.x,
      this.y,
      this.gunImage.rotation + this.rotation
    );
    this.moveBackGunTween();
  }

  turnOffBullet(bullet) {
    this.shootingAbility.turnOffBullet(bullet);
  }

  move(side) {
    const actions = {
      left: this.moveLeft,
      right: this.moveRight,
      up: this.moveUp,
      down: this.moveDown,
    };

    const action = actions[side];
    if (action) {
      action.call(this);
    }
  }

  createShootingAbility() {
    const config = this.config.bullet;
    const ability = new ShotManager(this.scene, config);
    return ability;
  }

  getBodyWidth() {
    return this.body.width;
  }

  getBodyHeight() {
    return this.body.height;
  }

  createTankBars() {
    const config = this.config.bars;
    const bars = new TankBars(this.scene, config);

    return bars;
  }

  getBulletDamageValue() {
    return this.bulletDamage;
  }

  rotateGunTowardMousePointer(image, rotationSpeed) {
    const targetAngle = Phaser.Math.Angle.Between(
      this.x + image.x - this.scene.cameras.main.scrollX,
      this.y + image.y - this.scene.cameras.main.scrollY,
      this.scene.input.x,
      this.scene.input.y
    );

    const additionalRotation = Phaser.Math.DegToRad(90);
    const newTargetAngle = targetAngle + additionalRotation;

    const angleDifference = newTargetAngle - (image.rotation + this.rotation);
    const rotationStep =
      Phaser.Math.Angle.Wrap(angleDifference) * rotationSpeed;

    image.rotation += rotationStep;
  }

  moveBackGunTween() {
    const { offset, ease, duration, yoyo } = this.config.gun;
    const rotation = this.gunImage.rotation;
    const { offsetX, offsetY } = calculateRotationProperties(offset, rotation);

    this.scene.tweens.add({
      targets: this.gunImage,
      ease: ease,
      x: -offsetX,
      y: offsetY,
      duration: duration,
      yoyo: yoyo,
    });
  }

  manageCondition(damage) {
    this.getDamage(damage);
    if (!this.haveNoHealth()) return;
    this.destroyObject();
  }

  playDestroyAnim() {
    this.destroyAnim.playAnim();
  }

  getDamage(damage) {
    this.tankBars.healthBar.getDamage(damage);
  }

  destroyObject() {
    this.disablePhysicsBody();
    this.setIsAlive(false);
    // this.shootingAbility.setCanAttack(false)
    this.setAlphaTween(0);
    // this.destroyTankBars();
    this.tankBars.setVisible(false);

    this.destroyAnim.playAnim(() => {
      this.setVisible(false);
      // this.destroy();
    });
  }

  respawn() {
    this.setIsAlive(true);
  }

  setIsAlive(value) {
    this.isAlive = value;
  }

  destroyTankBars() {
    this.tankBars.destroy();
  }

  setTankBarsPosition(x, y) {
    this.tankBars.setPosition(x, y);
  }

  disablePhysicsBody() {
    this.body.enable = false;
  }

  haveNoHealth() {
    return this.tankBars.healthBar.getHealthValue() <= 0;
  }

  canShootAttack() {
    return this.shootingAbility.isDisabled();
  }

  getActiveBullets() {
    return this.shootingAbility.getActiveBullets();
  }

  createDestroyAnim() {
    const config = this.config.explosionAnim;
    const anim = new AnimationManager(this.scene, config);

    return anim;
  }

  getHealthBarPercent() {
    return this.tankBars.healthBar.getHealthPercent();
  }

  setAlphaTween(value) {
    this.scene.tweens.add({
      targets: this,
      ease: "Power2",
      alpha: value,
      duration: 1000,
    });
  }

  getXY() {
    const x = this.x;
    const y = this.y;
    return { x, y };
  }
}
