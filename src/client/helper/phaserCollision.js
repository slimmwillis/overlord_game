export default function setCollision(scene, target1, target2, callback) {
  scene.physics.add.overlap(target1, target2, (bullet, enemy) => {
    callback(bullet, enemy);
  });
}
