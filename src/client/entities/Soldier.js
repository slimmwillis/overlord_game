import Bot from "./Bot";

export default class Soldier extends Bot {
  constructor(scene, config) {
    super(scene, config);
    this.scene = scene;
  }
}
