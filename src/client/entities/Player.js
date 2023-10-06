import Entity from "./Entity";

export default class Player extends Entity {
  constructor(scene, config) {
    super(scene, config);
    this.scene = scene;
  }
}
