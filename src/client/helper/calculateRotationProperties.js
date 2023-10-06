export default function calculateRotationProperties(offset, rotation) {
  const MathSinRotation = Math.sin(rotation);
  const MathCosRotation = Math.cos(rotation);

  const offsetX = offset * MathSinRotation;
  const offsetY = offset * MathCosRotation;

  return { MathSinRotation, MathCosRotation, offsetX, offsetY };
}
