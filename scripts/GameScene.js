class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
    }

    preload() {
        this.load.image('background', '../assets/background.jpg');
        this.load.image('test', '../assets/test.jpg');
    } //end preload

    create() {
        var box1 = this.add.sprite(300,300, 'test').setInteractive();
        box1.on('pointerdown', function (pointer){
            this.setTint(0xff0000);
        })
    } //end create

 
    update() {
    } //end update


} //end gameScene