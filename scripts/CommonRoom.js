var timesClicked = 0;
var key;
var value;
var foundRemoteKey = false;
var remoteBox;
var remote;
class CommonRoom extends Phaser.Scene {
    constructor() {
        super('commonRoom')
    }

    preload() {
        this.roomName;
        this.load.image('painting', 'assets/painting.jpg');
        this.load.image('key', 'assets/key.jpg');
        this.load.image('remoteBox', 'assets/remoteBox.png');
        this.load.image('remote', 'assets/remote.jpg');
    } //end preload

    create() {
        this.roomName = this.add.text(20, 35, 'Common room', { fontSize: '20px', fill: '#FFFFFF' });
        var engineRoomDoors = this.add.image(100, 500, 'subDoors').setInteractive();
        var controlRoomDoors = this.add.image(700, 500, 'subDoors').setInteractive();
        var paintingOnWall = this.add.image(300, 300, 'painting').setInteractive();
        remoteBox = this.add.image(600, 350, 'remoteBox').setInteractive();
        remote = this.add.image(600, 350, 'remote').setInteractive();
        key = this.add.image(100, 100, 'key').setInteractive();
        key.setVisible(false);
        remote.setVisible(false).setActive(false);


        //random number
        value = Phaser.Math.Between(1, 10);
            
        key.setScale(0.2);
        remoteBox.setScale(0.2);
        paintingOnWall.setScale(0.2);
        //image Scaling

        engineRoomDoors.setScale(0.2);
        controlRoomDoors.setScale(0.2);

        engineRoomDoors.on('pointerdown', this.onEngineDoorClick, this);
        controlRoomDoors.on('pointerdown', this.onControlDoorClick, this);
        paintingOnWall.on('pointerdown', this.onPaintingClick, this);
        remoteBox.on('pointerdown', this.onRemoteBoxClick, this);
        

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
    onRemoteBoxClick(){
        if (foundRemoteKey == true) {
            remoteBox.setVisible(false).setActive(false);
            remote.setActive(true).setVisible(true);
        }else{
            console.log("You need to find the key.")
        }
    }

    update() {
        if (timesClicked > value) {
            key.setVisible(true);
            foundRemoteKey = true;
        }
    } //end update
} //end title scene