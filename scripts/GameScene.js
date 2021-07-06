class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
    }
    preload() {
        this.roomName;
        this.load.image('subDoors', 'assets/doors.png');

    } //end preload

    create() {
        this.roomName = this.add.text(20, 35, 'Engine room', { fontSize: '20px', fill: '#FFFFFF' });
        var commonRoomDoors = this.add.image(700, 500, 'subDoors').setInteractive();

        commonRoomDoors.setScale(0.2);

        commonRoomDoors.on('pointerdown', this.onCommonDoorClick, this);

        this.load.image('background', '../assets/background.jpg');
        this.load.image('test', '../assets/test.jpg');
    } //end preload

    // OnClicks
    onCommonDoorClick(){
        this.scene.start("commonRoom");
    }

    update() {
    } //end update


} //end gameScene