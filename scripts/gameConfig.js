window.addEventListener('load', () => {
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x999999,
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
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "theGame"
    },
    pixelArt: true,
    scene: [GameScene, CommonRoom, ControlRoom]
}
const game = new Phaser.Game(config)
}) //end load listener