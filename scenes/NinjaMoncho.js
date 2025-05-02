// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class NinjaMoncho extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("NinjaMoncho");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
    this.load.image("Cielo", "public/assets/Cielo.webp");
    this.load.image("ground", "/public/assets/platform.png");
    this.load.image("diamond", "public/assets/diamond.png");
    this.load.image("FondoMenu", "public/assets/FondoMenu.jpg");
    this.load.image("square", "public/assets/square.png");
    this.load.image("triangle", "public/assets/triangle.png");
    this.load.image("Ninja", "public/assets/Ninja.png");
    
  }

  create() {
    // create game objects

   

  
    //Imagen de fondo
    this.add.image(400, 300, "Cielo").setScale(2);


    //Plataformas
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");

    //Ninja player
      this.Ninja = this.physics.add.sprite(400, 300, "Ninja");
      this.Ninja.setScale(0.1);
      this.Ninja.setBounce(0.2);
      this.Ninja.setCollideWorldBounds(true);

        //Movimiento
        this.cursors = this.input.keyboard.createCursorKeys();

        //Colisiones entre el ninja y las plataformas
          this.physics.add.collider(this.Ninja, this.platforms);


 

  }

  update() {// UPDATE GAME OBJECTS

      //Movimiento hacia la izq.
      if (this.cursors.left.isDown) {
      this.Ninja.setVelocityX(-160);
        //Rotacion de pelota hacia la izq.
          this.Ninja.angle -= 5; 
    } 
    
      //Movimiento hacia la derecha
      else if (this.cursors.right.isDown) {
      this.Ninja.setVelocityX(160);
        //Rotacion de pelota hacia la derecha
         this.Ninja.angle += 5; 
    } 
    
    
    else {
      this.Ninja.setVelocityX(0);
    }
  
     //Salto
    if (this.cursors.up.isDown && this.Ninja.body.touching.down) {
      this.Ninja.setVelocityY(-330);
    }



  }
}
