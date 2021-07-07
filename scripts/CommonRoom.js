var timesClicked = 0;
var key;
var value;
var foundRemoteKey = false;
class CommonRoom extends Phaser.Scene {
    constructor() {
        super('commonRoom')
    }

    preload() {
        this.roomName;
        this.load.image('painting', 'assets/painting.jpg');
        this.load.image('key', 'assets/key.jpg');
        this.load.image('remoteBox', 'assets/remoteBox.png');
    } //end preload

    create() {
        this.roomName = this.add.text(20, 35, 'Common room', { fontSize: '20px', fill: '#FFFFFF' });
        var engineRoomDoors = this.add.image(100, 500, 'subDoors').setInteractive();
        var controlRoomDoors = this.add.image(700, 500, 'subDoors').setInteractive();
        var paintingOnWall = this.add.image(300, 300, 'painting').setInteractive();
        key = this.add.image(100, 100, 'key').setInteractive();
        var remoteBox = this.add.image(500, 500, 'remoteBox').setInteractive();
        key.setVisible(false);

        //random number
        value = Phaser.Math.Between(1, 10);
            
        key.setScale(0.2);
        remoteBox.setScale(0.2);
        paintingOnWall.setScale(0.2);
        engineRoomDoors.setScale(0.2);
        controlRoomDoors.setScale(0.2);

        engineRoomDoors.on('pointerdown', this.onEngineDoorClick, this);
        controlRoomDoors.on('pointerdown', this.onControlDoorClick, this);
        paintingOnWall.on('pointerdown', this.onPaintingClick, this);

    } //end create

    // OnClicks
    onEngineDoorClick(){
        this.scene.start("engineRoom");
    }
    onControlDoorClick(){
        this.scene.start("controlRoom");
    }
    onPaintingClick(){
        timesClicked +=1;
    }

    update() {
        if (timesClicked > value) {
            key.setVisible(true);
        }
        console.log(value);
    } //end update
} //end title scene