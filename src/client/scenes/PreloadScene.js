import assetsConfig from "../config/assets/assetsConfig";
import createAnim from "../helper/createAnim";
import loadSpriteSheetsData from "../assets/images/loadSprtiesheetsData.json";
import loadImagesData from "../assets/images/loadImagesData.json";
import loadTilemapsData from "../assets/images/loadTilemapsData.json";
import createAnimsDataIndex from "../assets/images/createAnimsIndex";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
    const { images, audio } = assetsConfig;

    this.imagePath = images.path;
    this.imageExtension = images.extension;
    this.audioPath = audio.path;
    this.audioExtension = audio.extension;
  }

  preload() {
    this.loadOnCompleteCallback();

    this.loadAllImages();
    this.loadAllSpriteSheets();
    this.loadTilemapsJSON();
    //   this.load.audio("bazookaShoot", "audio/bazookaShoot.mp3");
  }

  create() {
    this.createAllAnims();
  }

  createAllAnims() {
    for (const createAnimsData of createAnimsDataIndex) {
      this.createAnims(createAnimsData);
    }
  }

  createAnims({ anims, count }) {
    for (let i = 0; i < count; i++) {
      for (let animData in anims) {
        const data = anims[animData];

        const modifiedData = {
          ...anims[animData],
          key: data.key + i,
          sprite: data.sprite + i,
        };

        createAnim(this, modifiedData);
      }
    }
  }

  loadAllSpriteSheets() {
    for (let loadSpriteSheetData in loadSpriteSheetsData) {
      const spriteSheetData = loadSpriteSheetsData[loadSpriteSheetData];
      this.loadSpriteSheets(spriteSheetData);
    }
  }

  loadSetPath(path) {
    this.load.setPath(path);
  }

  loadSpriteSheets({
    path,
    key,
    count,
    frameWidth,
    frameHeight,
    columns,
    rows,
  }) {
    this.loadSetPath(this.imagePath + path);

    for (let i = 0; i < count; i++) {
      const imageKey = key + i;
      const imageName = key + i + this.imageExtension;
      const imageFrameWidth = frameWidth / columns;
      const imageFrameHeight = frameHeight / rows;
      this.loadSpriteSheet(
        imageKey,
        imageName,
        imageFrameWidth,
        imageFrameHeight
      );
    }
  }

  loadSpriteSheet(key, name, frameWidth, frameHeight) {
    this.load.spritesheet(key, name, {
      frameWidth: frameWidth,
      frameHeight: frameHeight,
    });
  }

  loadImage(key) {
    this.load.image(key, key + this.imageExtension);
  }

  loadImages({ path, key, count }) {
    this.loadSetPath(this.imagePath + path);

    const start = 0;
    const end = count || 1;

    for (let i = start; i < end; i++) {
      const imageKey = key + (count ? i : "");
      this.loadImage(imageKey);
    }
  }

  loadAllImages() {
    for (let loadImageData in loadImagesData) {
      const imageData = loadImagesData[loadImageData];
      this.loadImages(imageData);
    }
  }

  loadTilemapJSON({ path, key, filename }) {
    this.loadSetPath(this.imagePath + path);
    this.load.tilemapTiledJSON(key, filename);
  }

  loadTilemapsJSON() {
    for (let loadTilemapData in loadTilemapsData) {
      const tilemapData = loadTilemapsData[loadTilemapData];
      this.loadTilemapJSON(tilemapData);
    }
  }

  loadOnCompleteCallback() {
    this.load.on("complete", () => {
      this.startPlayScene();
    });
  }

  // loadAudio() {
  //   this.audio = ["mainMenu", "click", "hurt", "startJump", "endJump"];
  //   this.audio.forEach((name) => {
  //     this.load.audio(name, `../audio/${name}.mp3`);
  //   });
  // }
  // addAudio() {
  //   this.game.audio = {};
  //   this.audio.forEach(
  //     (name) => (this.game.audio[name] = this.sound.add(name))
  //   );
  //   this.game.audio.mainMenu.setLoop(true);
  //   this.setupAudioVolume();
  // }
  // setupAudioVolume() {
  //   this.game.audio.hurt.setVolume(0.5);
  // }

  startPlayScene() {
    this.scene.start("HudScene");
    this.scene.start("PlayScene");
  }
}
