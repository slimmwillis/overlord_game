import ShotManager from "../combat/Shooting";
import TankHealthBar from "../components/TankHealthBar";
import playDelayCallback from "../helper/playDelayCallback";
import collisionHandler from "../helper/collisionHandler";
import AnimationManager from "../utils/AnimationManager";

export default class Bot extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    const {
      x,
      y,
      spriteID,
      moveSpeed,
      shootDelay,
      turnForce,
      bullet: { damage },
      startAttackRange,
    } = config;

    super(scene, x, y);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.config = config;
    this.scene.add.existing(this);
    this.spriteID = spriteID;
    this.moveSpeed = moveSpeed;
    this.shootDelay = shootDelay;
    this.turnForce = turnForce;
    this.bulletDamage = damage;
    this.startAttackRange = startAttackRange;
    this.startAttackRange = this.config.startAttackRange;
    this.canAttack = true;
    this.isAlive = true;

    this.topSprite = this.createTop();
    this.downSprite = this.createDown();
    this.healthBar = this.createHealthBar();
    this.destroyAnim = this.createDestroyAnim();

    this.add([this.downSprite, this.topSprite, this.destroyAnim]);

    this.addPhysics();
    this.shootingAbility = this.createShootingAbility();
    this.playIdle();

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

  createTop() {
    const sprite = this.config.spriteStructure.top;
    const body = this.scene.add.sprite(0, 0, sprite).setOrigin(0.5, 0.5);

    return body;
  }

  createDown() {
    const sprite = this.config.spriteStructure.down;
    const legs = this.scene.add.sprite(0, 0, sprite).setOrigin(0.5, 0.5);

    return legs;
  }

  createShootingAbility() {
    const config = this.config.bullet;
    const ability = new ShotManager(this.scene, config);
    return ability;
  }

  createHealthBar() {
    const config = this.config.health;
    const healthbar = new TankHealthBar(this.scene, config).setScale(0.7);

    return healthbar;
  }

  createDestroyAnim() {
    const config = this.config.explosionAnim;
    const anim = new AnimationManager(this.scene, config);

    return anim;
  }

  addPhysics() {
    this.scene.physics.world.enableBody(this);
    this.body.setCollideWorldBounds(true);
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

  getBodyWidth() {
    return this.body.width;
  }

  getBodyHeight() {
    return this.body.height;
  }

  updateHealthBarPosition() {
    const healthBar = this.healthBar;
    const offsetY = healthBar.getOffsetY();
    healthBar.setPosition(this.x, this.y + offsetY);
  }

  playIdleAnims() {
    const { top, down } = this.config.anims;
    const topIdle = top.idle;
    const downIdle = down.idle;
    this.topSprite.play(topIdle, true);
    this.downSprite.play(downIdle, true);
  }

  playShootAnim(callback) {
    const shootAnim = this.config.anims.top.attack;
    this.topSprite.play(shootAnim, true).once("animationcomplete", () => {
      if (!callback) return;
      callback();
    });
  }

  playMoveAnim() {
    const animKey = this.config.anims.down.move;
    this.downSprite.play(animKey, true);
  }

  moveRight() {
    this.setBodyVelocityX(1);
    this.playMoveAnim();
  }

  moveLeft() {
    this.setBodyVelocityX(-1);
    this.playMoveAnim();
  }

  moveUp() {
    this.setBodyVelocityY(-1);
    this.playMoveAnim();
  }

  moveDown() {
    this.setBodyVelocityY(1);
    this.playMoveAnim();
  }
  playIdle() {
    this.stopMove();
    this.playIdleAnims();
  }

  stopAnims() {
    this.downSprite.anims.stop();
    this.topSprite.anims.stop();
  }

  playDeadAnim(callback) {
    const animKey = this.config.anims.top.dead;
    this.topSprite.play(animKey, true);
    if (!callback) return;
    callback();
  }

  setBodyVelocityX(sign) {
    this.body.setVelocityX(this.moveSpeed * sign);
  }

  setBodyVelocityY(sign) {
    this.body.setVelocityY(this.moveSpeed * sign);
  }

  stopMove() {
    this.body.setVelocity(0);
  }

  getActiveBullets() {
    return this.shootingAbility.getActiveBullets();
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

  manageCondition(damage) {
    this.getDamage(damage);
    if (!this.haveNoHealth()) return;
    this.kill();
  }

  haveNoHealth() {
    return this.healthBar.getHealthValue() <= 0;
  }

  getDamage(damage) {
    this.healthBar.getDamage(damage);
  }

  disablePhysicsBody() {
    this.body.enable = false;
  }

  respawn() {
    this.setIsAlive(true);
  }

  setIsAlive(value) {
    this.isAlive = value;
  }

  setAlphaTween(value) {
    this.scene.tweens.add({
      targets: this,
      ease: "Power2",
      alpha: value,
      duration: 1000,
    });
  }

  makeInvisibleWithDelay(delayTime) {
    playDelayCallback(this.scene, delayTime, () => {
      this.setAlphaTween(0);
    });
  }

  kill() {
    this.disablePhysicsBody();
    this.setIsAlive(false);
    this.healthBar.setVisible(false);
    this.stopAnims();
    this.playDestroyAnim();
    this.playDeadAnim(() => {
      this.makeInvisibleWithDelay(this.config.deadInvisibleDelayTime);
    });
  }

  getShootAttackRange() {
    return this.shootingAbility.getAttackRange();
  }

  canShootAttack() {
    return this.shootingAbility.isDisabled();
  }

  getActiveBullets() {
    return this.shootingAbility.getActiveBullets();
  }

  getUpdatedRotation() {
    return this.rotation + Phaser.Math.DEG_TO_RAD * 180;
  }

  shoot() {
    const rotation = this.getUpdatedRotation();
    this.shootingAbility.disableAttackForTime(this.shootDelay);
    this.shootingAbility.shootBulletFrom(this.x, this.y, rotation);
  }

  turnOffBullet(bullet) {
    this.shootingAbility.turnOffBullet(bullet);
  }

  getBulletDamageValue() {
    return this.bulletDamage;
  }

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

  isInAttackRange(x, y) {
    const target = { x, y };
    const offset = this.startAttackRange;
    return !collisionHandler(target, this, offset);
  }

  playDestroyAnim() {
    this.destroyAnim.playAnim();
  }
}
