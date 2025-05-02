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
  

    //Ninja player
      this.Ninja = this.physics.add.sprite(400, 300, "Ninja");
      this.Ninja.setScale(0.1);
      this.Ninja.setBounce(0.2);
      this.Ninja.setCollideWorldBounds(true);

        //Movimiento
        this.cursors = this.input.keyboard.createCursorKeys();

        //Colisiones entre el ninja y las plataformas
          this.physics.add.collider(this.Ninja, this.platforms);


    // Contadores por tipo
        this.itemCounts = {
          square: 0,
          triangle: 0,
          diamond: 0
        };

        // Textos en pantalla
          this.add.text(16, 10, 'Recolección:', { fontSize: '20px', fill: '#fff' });
          this.scoreText = this.add.text(16, 40, 'Cuadrados: 0\nTriángulos: 0\nDiamantes: 0', {
          fontSize: '18px',
          fill: '#fff'
        });

        // Grupo de ítems
            this.itemsGroup = this.physics.add.group();

        // Hacer caer un ítem cada 0.5 segundos
          this.time.addEvent({
          delay: 500,
          loop: true,
          callback: () => {
          const tipos = ["square", "triangle", "diamond"];
          const tipo = Phaser.Utils.Array.GetRandom(tipos);
          const x = Phaser.Math.Between(50, 750);
            const item = this.itemsGroup.create(x, 0, tipo).setScale(1);
          item.setData("tipo", tipo);
          item.setVelocityY(150);
          }
        });

        // Recolección
          this.physics.add.overlap(this.Ninja, this.itemsGroup, (jugador, item) => {
          const tipo = item.getData("tipo");
          this.itemCounts[tipo]++;
          item.destroy();

          // Actualizar texto
            this.scoreText.setText(
            `Cuadrados: ${this.itemCounts.square}\nTriángulos: ${this.itemCounts.triangle}\nDiamantes: ${this.itemCounts.diamond}`
          );

          // Verificar victoria
          if (
            this.itemCounts.square >= 2 &&
            this.itemCounts.triangle >= 2 &&
            this.itemCounts.diamond >= 2
          ) {
            this.add.text(this.scale.width / 2, this.scale.height / 2, '¡GANASTE!', {
              fontSize: '64px',
              fill: '#0f0',
              fontStyle: 'bold',
              align: 'center'
            }).setOrigin(0.5, 0.5); // Center the text
            this.scene.pause();
            
            
          }
        });

    


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

