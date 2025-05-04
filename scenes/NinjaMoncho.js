// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class NinjaMoncho extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("NinjaMoncho");}
    
      init() {
        this.tiempoRestante = 30;
        this.puntaje = 0;
        this.gameOver = false;
      }
    
      preload() {
        const ruta = "public/assets/";
        this.load.image("Cielo", ruta + "Cielo.webp");
        this.load.image("ground", ruta + "platform.png");
        this.load.image("diamond", ruta + "diamond.png");
        this.load.image("square", ruta + "square.png");
        this.load.image("triangle", ruta + "triangle.png");
        this.load.image("skull", ruta + "skull.png");
        this.load.image("Ninja", ruta + "Ninja.png");
      }
    
      create() {
        // Fondo
        this.add.image(400, 300, "Cielo").setScale(2);
    
        // Plataformas
        this.platforms = this.physics.add.staticGroup();
        const plataformas = [
          [400, 568, 2],
          [600, 400, 1],
          [50, 250, 1],
          [750, 220, 1],
        ];
        plataformas.forEach(([x, y, scale]) => {
          this.platforms.create(x, y, "ground").setScale(scale).refreshBody();
        });
    
        // Jugador
        this.Ninja = this.physics.add.sprite(400, 300, "Ninja")
          .setScale(0.1)
          .setBounce(0.2)
          .setCollideWorldBounds(true);
    
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.Ninja, this.platforms);
    
        // Texto de puntaje
        this.scoreText = this.add.text(16, 40, 'Puntos: 0', {
          fontSize: '24px', fill: '#fff'
        });
    
        // Items
        this.itemsGroup = this.physics.add.group();
        this.generadorItems = this.time.addEvent({
          delay: 500,
          loop: true,
          callback: this.generarItem,
          callbackScope: this
        });
    
        this.physics.add.overlap(this.Ninja, this.itemsGroup, this.recolectarItem, null, this);
        this.physics.add.collider(this.itemsGroup, this.platforms, this.itemEnSuelo, null, this);
    
        // Temporizador
        this.textoTemporizador = this.add.text(this.scale.width - 16, 16, `Tiempo: ${this.tiempoRestante}`, {
          fontSize: '32px', fill: '#fff'
        }).setOrigin(1, 0);
    
        this.time.addEvent({
          delay: 1000,
          callback: this.actualizarTemporizador,
          callbackScope: this,
          loop: true
        });
      }
    
      generarItem() {
        if (this.gameOver) return;
        const tipos = ["square", "triangle", "diamond", "skull"];
        const tipo = Phaser.Utils.Array.GetRandom(tipos);
        const item = this.itemsGroup.create(Phaser.Math.Between(50, 750), 0, tipo);
        item.setData("tipo", tipo).setVelocityY(100);
      }
    
      recolectarItem(jugador, item) {
        const tipo = item.getData("tipo");
        item.destroy();
    
        const puntajes = {
          square: 10,
          triangle: 15,
          diamond: 25,
          skull: -5
        };
    
        this.puntaje += puntajes[tipo] || 0;
        this.scoreText.setText(`Puntos: ${this.puntaje}`);
    
        if (this.puntaje >= 100) {
          this.finalizarJuego("GANASTE");
        }
      }
    
      itemEnSuelo(item) {
        this.puntaje -= 5;
        this.scoreText.setText(`Puntos: ${this.puntaje}`);
        item.destroy();
      }
    
      actualizarTemporizador() {
        if (this.gameOver) return;
    
        this.tiempoRestante--;
        this.textoTemporizador.setText(`Tiempo: ${this.tiempoRestante}`);
    
        if (this.tiempoRestante <= 0) {
          this.finalizarJuego("PERDISTE");
        }
      }
    
      finalizarJuego(resultado) {
        this.gameOver = true;
        this.physics.pause();
        this.Ninja.setTint(0xff0000);
        if (this.generadorItems) this.generadorItems.remove(false);
        this.scene.start("EndScene", { resultado, puntaje: this.puntaje });
      }
    
      update() {
        if (this.gameOver) return;
    
        const { left, right, up } = this.cursors;
    
        if (left.isDown) {
          this.Ninja.setVelocityX(-250);
          this.Ninja.angle -= 5;
        } else if (right.isDown) {
          this.Ninja.setVelocityX(250);
          this.Ninja.angle += 5;
        } else {
          this.Ninja.setVelocityX(0);
        }
    
        if (up.isDown && this.Ninja.body.touching.down) {
          this.Ninja.setVelocityY(-400);
        }
      }
    }
    

