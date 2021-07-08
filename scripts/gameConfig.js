window.addEventListener('load', () => {
let config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 300,
    backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            gravity: {
                y: 0
            }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "theGame"
    },
    pixelArt: true,
    scene: [EngineRoom, CommonRoom, ControlRoom, UIScene]
}
const game = new Phaser.Game(config)
}) //end load listener