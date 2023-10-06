export default function createAnim(
  scene,
  { key, sprite, frames, frameRate, repeat }
) {
  scene.anims.create({
    key: key,
    frames: scene.anims.generateFrameNumbers(sprite, {
      frames: frames,
    }),
    frameRate: frameRate,
    repeat: repeat,
  });
}
