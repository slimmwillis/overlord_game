import TankHealthBar from "./TankHealthBar";
import TankAmmoBar from "./TankAmmoBar";

export default class TankBarsLabel extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    const x = config.x;
    const y = config.y;

    super(scene, x, y);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.config = config;
    this.scene.add.existing(this);

    this.healthBar = this.createHealthBar();
    this.ammoBar = this.createAmmoBar();

    this.add([this.healthBar, this.ammoBar]);
  }

  createHealthBar() {
    const config = this.config.health;
    const healthbar = new TankHealthBar(this.scene, config);

    return healthbar;
  }

  createAmmoBar() {
    const config = this.config.ammoBar;
    const ammoBar = new TankAmmoBar(this.scene, config);

    return ammoBar;
  }

  updateAmmoBar() {
    if (this.isAmmoBarAmmoImagesEmpty()) return;
    this.ammoBar.removeAmmoImage();
  }

  isAmmoBarAmmoImagesEmpty() {
    return this.ammoBar.isEmpty();
  }

  resetAmmoBarAmmoImages() {
    this.ammoBar.resetAmmoImages();
  }

  handleReloadAmmoImages() {
    if (this.ammoBar.isReloading) return;
    this.ammoBar.setReloading(true);
    this.reloadAmmoImagesWithDelayTime();
  }

  reloadAmmoImagesWithDelayTime() {
    const delayTime = this.config.ammoBar.resetDelayTime;
    this.scene.time.delayedCall(delayTime, () => {
      this.resetAmmoBarAmmoImages();
      this.ammoBar.setReloading(false);
    });
  }
}
