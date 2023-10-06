export default function checkCollisionWithObject(object1, object2, offset) {
  return (
    object1.y <= object2.y - offset ||
    object1.y >= object2.y + offset ||
    object1.x <= object2.x - offset ||
    object1.x >= object2.x + offset
  );
}
