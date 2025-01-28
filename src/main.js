// William Wu
// Rocket Club
// 10 1/2 hours
// Allow the player to control the Rocket after it's fired (1)
// Display the time remaining (in seconds) on the screen (3) 
// Implement an alternating two-player mode (5)
// Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
// Implement the 'FIRE' UI text from the original game (1)




let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ ModeSelect, Menu, Play ]
  }

let game = new Phaser.Game(config)
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keyFIRE2, keyW, keyA, keyD



