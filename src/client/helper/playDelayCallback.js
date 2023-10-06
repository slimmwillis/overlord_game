export default function delayCallback(scene, delayTime, callback) {
  scene.time.delayedCall(delayTime, () => {
    callback();
  });
}
