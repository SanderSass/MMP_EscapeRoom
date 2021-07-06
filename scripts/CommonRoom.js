class CommonRoom extends Phaser.Scene {
    constructor() {
        super('commonRoom')
    }

    preload() {
        this.roomName;
    } //end preload

    create() {
        this.roomName = this.add.text(20, 35, 'Common room', { fontSize: '20px', fill: '#FFFFFF' });
        var engineRoomDoors = this.add.image(100, 500, 'subDoors').setInteractive();
        var controlRoomDoors = this.add.image(700, 500, 'subDoors').setInteractive();

        engineRoomDoors.setScale(0.2);
        controlRoomDoors.setScale(0.2);

        engineRoomDoors.on('pointerdown', this.onEngineDoorClick, this);
        controlRoomDoors.on('pointerdown', this.onControlDoorClick, this);

    } //end create

    // OnClicks
    onEngineDoorClick(){
        this.scene.start("engineRoom");
    }
    onControlDoorClick(){
        this.scene.start("controlRoom");
    }

    update() {

    } //end update
} //end title scene