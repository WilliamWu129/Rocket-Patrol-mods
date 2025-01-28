class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
    }

    create(){
      if(game.settings.twoPlayerMode){
        console.log('Two-player mode enabled. Timer initialized.');//print
        this.activePlayer = 1;
        this.switchTimer = this.time.addEvent({
          delay: 5000,
          callback: this.switchPlayerControl,
          callbackScope: this,
          loop: true
        })
      }


        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        

        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize* 5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)
        //new smaller ship worth more points
        this.smallShip = new SmallSpaceship(this, game.config.width, borderUISize * 4, 'smallShip', 0, 50);



        
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)


        //secondplayer controls
        keyFIRE2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

      // Text to tell who is currently playing
        this.activePlayerText = this.add.text(
          game.config.width / 2, borderUISize + borderPadding * 2, 
          'Player: 1', 
          { fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'center' }
      ).setOrigin(0.5);
  
      //Fire Text
        this.fireText = this.add.text(
        this.p1Rocket.x, this.p1Rocket.y - 20,
        'Fire!',
        {
          fontFamily: 'Courier',
          fontSize: '14px',
          color: '#FF0000',
          align: 'center'

        }
      ).setOrigin(0.5).setAlpha(0);


        this.p1Score = 0

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
          }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
    
        //gameoverflag
        this.gameOver = false

        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)


        //timerDisplay

        this.timerText = this.add.text(
          game.config.width - borderUISize - borderPadding -150, borderUISize + borderPadding * 2, 
          'Time: ' + Math.ceil(game.settings.gameTimer / 1000), 
          { 
              fontFamily: 'Courier', 
              fontSize: '28px', 
              backgroundColor: '#F3B141', 
              color: '#843605', 
              align: 'righ', 
              padding: { top: 5, bottom: 5 }, 
              fixedWidth: 150 
          }
      );

    }
 
    update() {
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
          this.scene.restart();
      }
  
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          this.scene.start("menuScene");
      }
  
      this.starfield.tilePositionX -= 4;
  
      if (!this.gameOver) {
        if (!game.settings.twoPlayerMode || this.activePlayer === 1) {
          // Player 1 controls
          if (keyLEFT.isDown && this.p1Rocket.x >= borderUISize + this.p1Rocket.width) {
              this.p1Rocket.x -= this.p1Rocket.moveSpeed;
          } else if (keyRIGHT.isDown && this.p1Rocket.x <= game.config.width - borderUISize - this.p1Rocket.width) {
              this.p1Rocket.x += this.p1Rocket.moveSpeed;
          }

          if (Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.p1Rocket.isFiring) {
              this.p1Rocket.isFiring = true;
              this.p1Rocket.sfxShot.play();

              //Fire Text
              this.fireText.setPosition(this.p1Rocket.x, this.p1Rocket.y - 20)
              this.fireText.setAlpha(1)

              this.time.delayedCall(500, ()=> {
                this.fireText.setAlpha(0)
              }, null, this)
          }
      } else if (this.activePlayer === 2) {
          // Player 2 controls
          if (keyA.isDown && this.p1Rocket.x >= borderUISize + this.p1Rocket.width) {
              this.p1Rocket.x -= this.p1Rocket.moveSpeed;
          } else if (keyD.isDown && this.p1Rocket.x <= game.config.width - borderUISize - this.p1Rocket.width) {
              this.p1Rocket.x += this.p1Rocket.moveSpeed;
          }

          if (Phaser.Input.Keyboard.JustDown(keyFIRE2) && !this.p1Rocket.isFiring) {
              this.p1Rocket.isFiring = true;
              this.p1Rocket.sfxShot.play();

              this.fireText.setPosition(this.p1Rocket.x, this.p1Rocket.y - 20)
              this.fireText.setAlpha(1) // Fire text


              this.time.delayedCall(500, () => {
                this.fireText.setAlpha(0)
              }, null, this)
          }
      }
    
          // Rocket firing logic
          if (this.p1Rocket.isFiring && this.p1Rocket.y >= borderUISize * 3 + borderPadding) {
              this.p1Rocket.y -= this.p1Rocket.moveSpeed;
          }
  
          if (this.p1Rocket.y <= borderUISize * 3 + borderPadding) {
            console.log('Missed a ship. Subtracting time.')
            this.clock.delay -= 5000 //for time subtraction on every shot missed 5secs
            this.p1Rocket.reset();
          }
  
          this.ship01.update();
          this.ship02.update();
          this.ship03.update();
          this.smallShip.update();
  
          // Update timer display
          this.timerText.setText('Time: ' + Math.ceil(this.clock.getRemainingSeconds()));
      }
  
      // Check collisions
      if (this.checkCollision(this.p1Rocket, this.ship03)) {
          this.p1Rocket.reset();
          this.shipExplode(this.ship03);
      }
      if (this.checkCollision(this.p1Rocket, this.ship02)) {
          this.p1Rocket.reset();
          this.shipExplode(this.ship02);
      }
      if (this.checkCollision(this.p1Rocket, this.ship01)) {
          this.p1Rocket.reset();
          this.shipExplode(this.ship01);
      }
      if(this.checkCollision(this.p1Rocket, this.smallShip)){
        this.p1Rocket.reset();
        this.shipExplode(this.smallShip);
      }
  }
  
    
    //swapping players
    switchPlayerControl() {
      this.activePlayer = this.activePlayer === 1 ? 2 : 1; 
      this.activePlayerText.setText('Player: ' + this.activePlayer);
      console.log('Switched to player:', this.activePlayer)
  }
  

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) 
          {
            console.log('Collision Detected')//bug fixing
          return true
        } else {
          return false
        }
      }

      shipExplode(ship) {
        ship.alpha = 0

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')
        boom.on('animationcomplete', () => {
          ship.reset()
          ship.alpha = 1
          boom.destroy()
        })  
        
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        let timeGain = ship.texture.key === 'smallShip' ? 10 : 2; // Small ship gives 10 seconds, others 2 seconds
        this.clock.delay += timeGain * 1000 // Add time in milliseconds
        console.log(`Hit ${ship.texture.key}. Time added: ${timeGain} seconds`)

        this.sound.play('sfx-explosion')
      }


}


