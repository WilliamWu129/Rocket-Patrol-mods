class SmallSpaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)

        // Add to the scene
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed + 2; // Faster than regular spaceships

        this.setScale(0.05)

        this.setSize(this.width * 0.05, this.height * 0.05)//change the hitbox size

    }

    update(){
        this.x -= this.moveSpeed

        if(this.x <= 0 - this.width){
            this.x = game.config.width
        }
    }

    reset() {
        this.x = game.config.width;
        
    }
}
