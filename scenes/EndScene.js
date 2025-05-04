export default class EndScene extends Phaser.Scene {
    constructor() {
      super("EndScene");
    }
  
    init(data) {
      this.resultado = data.resultado;
      this.puntaje = data.puntaje;
    }
  
    preload() {
      this.load.image("FondoMenu", "public/assets/FondoMenu.jpg");
    }
  
    create() {
        this.add.image(400, 300, "FondoMenu").setDisplaySize(800, 600);
        
        this.add.text(400, 200, this.resultado, {
        fontFamily: "Times New Roman",
        fontSize: "60px",
        fill: "#ff0000",
        strokeThickness: 3
      }).setOrigin(0.5);
  
      this.add.text(400, 270, `Puntaje: ${this.puntaje}`, {
        fontSize: "32px",
        fontFamily: "Times New Roman",
        fill: "#ffffff"
      }).setOrigin(0.5);
  
      this.add.text(400, 360, "Presiona R para reiniciar", {
        fontSize: "24px",
        fontFamily: "Times New Roman",
        fill: "#ffffff"
      }).setOrigin(0.5);
  
      this.add.text(400, 410, "Presiona M para volver al menú", {
        fontSize: "24px",
        fontFamily: "Times New Roman",
        fill: "#ffffff"
      }).setOrigin(0.5);
  
      this.input.keyboard.once("keydown-R", () => {
        this.scene.start("NinjaMoncho");
      });
  
      this.input.keyboard.once("keydown-M", () => {
        this.scene.start("MenuScene");
      });
    }
  }
  