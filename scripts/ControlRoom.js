class ControlRoom extends Phaser.Scene {
    constructor() {
        super('controlRoom')
    }

    preload() {
        this.roomName;
    } //end preload

    create() {
        this.roomName = this.add.text(20, 35, 'Control room', { fontSize: '20px', fill: '#FFFFFF' });
        var commonRoomDoors = this.add.image(100, 500, 'subDoors').setInteractive();

        //image Scaling
        commonRoomDoors.setScale(0.2);

        commonRoomDoors.on('pointerdown', this.onDoorClick, this);

    } //end create

    // OnClicks
    onDoorClick(){
        this.scene.start("commonRoom");
    }

    update() {

    } //end update
} //end title scene