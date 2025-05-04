export default class MenuScene extends Phaser.Scene {
    constructor() {
      super("MenuScene");
    }
  
    preload() {
      this.load.image("FondoMenu", "public/assets/FondoMenu.jpg");
    }
  
    create() {
        this.add.image(400, 300, "FondoMenu").setDisplaySize(800, 600);
        this.add.text(400, 180, "NINJA MONCHO", {
        fontFamily: "Times New Roman",
        fontSize: "60px",
        fill: "#ff0000",
        strokeThickness: 3,
      }).setOrigin(0.5);
  
      this.add.text(400, 300, "Presiona ENTER para jugar", {
        fontSize: "24px",
        fontFamily: "Times New Roman",
        fill: "#000000",
      }).setOrigin(0.5);
  
      this.input.keyboard.once("keydown-ENTER", () => {
        this.scene.start("NinjaMoncho");
      });
    }
  }
  