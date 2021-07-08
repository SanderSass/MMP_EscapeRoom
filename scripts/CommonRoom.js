var timesClicked = 0;
var key;
var value;
var remotePuzzleSolved = false;
var foundRemoteKey = false;
var remoteBox;
var remote;
class CommonRoom extends Phaser.Scene {
    constructor() {
        super('commonRoom')
    }

    preload() {
        this.roomName;
        this.paintingOnWall;

        this.load.image('painting', 'assets/painting.jpg');
        this.load.image('key', 'assets/key.png');
        this.load.image('remoteBox', 'assets/remoteBox.png');
        this.load.image('remote', 'assets/remote.jpg');
        this.load.image('commonRoom', 'assets/commonRoom.png');
        this.load.image('dirArrowLeft', 'assets/directionArrow.png');
        this.load.image('dirArrowRight', 'assets/directionArrowRight.png');

    } //end preload

    create() {
        this.roomName = this.add.text(20, 20, 'Common room', { fontSize: '20px', fill: '#FFFFFF' });
        this.roomName.setDepth(1);
        var bgCommonRoom = this.add.image(0, 0, 'commonRoom').setInteractive();
        this.paintingOnWall = this.add.image(606, 122, 'painting').setInteractive().setRotation(0.15);
        var dirArrowToEngineRoom = this.add.image(50, 100, 'dirArrowLeft').setInteractive();
        var dirArrowToControlRoom = this.add.image(1450, 100, 'dirArrowRight').setInteractive();
        var bookshelfBox = this.add.rectangle(800, 50, 15, 30, 0x6666ff);
        remoteBox = this.add.image(1200, 60, 'remoteBox').setInteractive();
        remote = this.add.image(1200, 60, 'remote').setInteractive();
        key = this.add.image(170, 198, 'key').setInteractive();


        bgCommonRoom.setOrigin(0);

        //assets visibility
        dirArrowToEngineRoom.setAlpha(0.2);
        dirArrowToControlRoom.setAlpha(0.2);
        key.setVisible(false);
        remote.setVisible(false).setActive(false);

        //assets scale
        bgCommonRoom.setScale(1.425, 1.1);
        dirArrowToEngineRoom.setScale(0.3);
        dirArrowToControlRoom.setScale(0.3);
        key.setScale(0.2);
        remoteBox.setScale(0.2);
        this.paintingOnWall .setScale(0.11);

        //random number
        value = Phaser.Math.Between(1, 10);

        //assets events
        dirArrowToEngineRoom.on('pointerdown', this.onEngineDoorClick, this);
        dirArrowToControlRoom.on('pointerdown', this.onControlDoorClick, this);
        this.paintingOnWall.on('pointerdown', this.wallPaintingRotation, this);
        remoteBox.on('pointerdown', this.onRemoteBoxClick, this);
        key.on('pointerdown', this.pickUpRemoteKey, this);


        dirArrowToEngineRoom.on('pointerover',function(){
            dirArrowToEngineRoom.setAlpha(1);
            dirArrowToEngineRoom.on('pointerout',function(){
                dirArrowToEngineRoom.setAlpha(0.2);
            });
        });
        dirArrowToControlRoom.on('pointerover',function(){
            dirArrowToControlRoom.setAlpha(1);
            dirArrowToControlRoom.on('pointerout',function(){
                dirArrowToControlRoom.setAlpha(0.2);
            });
        });


    } //end create

    // OnClicks
    onEngineDoorClick(){
        this.scene.start("engineRoom");
    }
    onControlDoorClick(){
        this.scene.start("controlRoom");
    }
    onRemoteBoxClick(){
        if (foundRemoteKey == true) {
            remoteBox.setVisible(false).setActive(false);
            remote.setActive(true).setVisible(true);
        }else{
            console.log("You need to find the key.")
        }
    }
    wallPaintingRotation(){
        timesClicked +=1;
        if(timesClicked >= value && remotePuzzleSolved == false){
            remotePuzzleSolved = true;
            key.setVisible(true).setRotation(1.5);
            this.tweens.add({
                targets: this.paintingOnWall , //your image that must spin
                rotation: -0.010, //rotation value must be radian
                duration: 500 //duration is in milliseconds
            });
        }
    }
    pickUpRemoteKey(){
        foundRemoteKey = true;
        key.setVisible(false);
    }

    update() {

    } //end update
} //end title scene