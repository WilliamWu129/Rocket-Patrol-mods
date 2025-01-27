class ModeSelect extends Phaser.Scene {
    constructor(){
        super("modeSelectScene")
    }

    create(){
        let menuConfig ={
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: { 
                top: 5,
                bottom: 5 },
            fixedWidth: 0
        }


        //text for choosing single or two player
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Choose Gamemode',
            menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'use <--> arrows to choose Single or Multi Player', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Single or -> for Two-players', menuConfig).setOrigin(0.5)
        

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // Single-player mode
            game.settings = { ...game.settings, twoPlayerMode: false };
            console.log('Single-player mode selected:', game.settings); 
            this.scene.start("menuScene"); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // Two-player alternating mode
            game.settings = { ...game.settings, twoPlayerMode: true }; 
            console.log('Two-player mode selected:', game.settings);
            this.scene.start("menuScene"); 
        }
    }



}
