// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class NinjaMoncho extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("NinjaMoncho");
  }

  init() {
    // init variables
    this.tiempoRestante = 30; // segundos
    this.textoTemporizador = null;
    this.gameOver = false;
    this.puntajeTotal = 0;

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


    // PUNTAJE AGREGADO - MEJORA 2
      this.puntaje = 0;
      this.scoreText = this.add.text(16, 40, 'Puntos: 0', {
      fontSize: '24px',
      fill: '#fff'
        });

      // Grupo de ítems
        this.itemsGroup = this.physics.add.group();

        this.generadorItems = this.time.addEvent({
          delay: 500,
          loop: true,
          callback: () => {
            if (this.gameOver) return;

            const tipos = ["square", "triangle", "diamond"];
            const tipo = Phaser.Utils.Array.GetRandom(tipos);
            const x = Phaser.Math.Between(50, 750);
            const item = this.itemsGroup.create(x, 0, tipo);
            item.setData("tipo", tipo);
            item.setVelocityY(150);
          }
        });

       // Recolección
          this.physics.add.overlap(this.Ninja, this.itemsGroup, (jugador, item) => {
          const tipo = item.getData("tipo");
          item.destroy();

          // Sumar puntos según tipo
            if (tipo === "square") this.puntaje += 10;
            else if (tipo === "triangle") this.puntaje += 15;
            else if (tipo === "diamond") this.puntaje += 25;

          // Mostrar puntaje
            this.scoreText.setText(`Puntos: ${this.puntaje}`);

          // Condición de victoria
            if (this.puntaje >= 100) {
            this.add.text(this.scale.width / 2, this.scale.height / 2, '¡GANASTE!', {
              fontSize: '64px',
              fontStyle: 'bold',
              fill: '#0f0'
            }).setOrigin(0.5);
            this.scene.pause();
          }
        });


    


        // TEMPORIZADOR AGREGADO //
            this.textoTemporizador = this.add.text(this.scale.width - 16, 16, 'Tiempo: ' + this.tiempoRestante, {
              fontSize: '32px',
              fill: '#fff',
            }).setOrigin(1, 0);

            this.actualizarTemporizador = () => {
              if (this.gameOver) return;

              this.tiempoRestante--;
              this.textoTemporizador.setText('Tiempo: ' + this.tiempoRestante);

              if (this.tiempoRestante <= 0) {
                this.tiempoRestante = 0;
                this.physics.pause();
                this.Ninja.setTint(0xff0000);
                this.gameOver = true;

                this.generadorItems.remove();

                this.add.text(this.scale.width / 2, this.scale.height / 2, '¡PERDISTE!', {
                  fontSize: '48px',
                  fill: '#ff0000',
                  fontStyle: 'bold'
                }).setOrigin(0.5, 0.5);
              }
            };

            this.time.addEvent({
              delay: 1000,
              callback: this.actualizarTemporizador,
              callbackScope: this,
              loop: true
                        });



  }

  update() {// UPDATE GAME OBJECTS

    if (this.gameOver) return;

    
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

