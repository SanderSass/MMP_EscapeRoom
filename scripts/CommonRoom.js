var timesClicked = 0;
var key;
var value;
var paintingPuzzleSolved = false;
var foundSafeKey = false;
var isSafeOpen = false;
class CommonRoom extends Phaser.Scene {
    constructor() {
        super('commonRoom')
    }

    preload() {
        this.roomName;
        this.paintingOnWall;


        this.load.image('painting', 'assets/painting.jpg');
        this.load.image('key', 'assets/key.png');
        this.load.image('commonRoom', 'assets/commonRoom.png');
        this.load.image('dirArrowLeft', 'assets/directionArrow.png');
        this.load.image('dirArrowRight', 'assets/directionArrowRight.png');
        this.load.image('openedSafe', 'assets/openSafe.png');

    } //end preload

    create() {
        this.roomName = this.add.text(20, 20, 'Common room', { fontSize: '20px', fill: '#FFFFFF' });
        this.roomName.setDepth(1);
        var bgCommonRoom = this.add.image(0, 0, 'commonRoom').setInteractive();
        this.openedSafe = this.add.image(1210, 124, 'openedSafe').setInteractive();
        this.safeRec = this.add.rectangle(1210, 124, 60, 70).setInteractive();
        var dirArrowToEngineRoom = this.add.image(50, 100, 'dirArrowLeft').setInteractive();
        var dirArrowToControlRoom = this.add.image(1450, 100, 'dirArrowRight').setInteractive();
        key = this.add.image(170, 198, 'key').setInteractive();


        // Keeping the painting rotated while switching scenes
        if(paintingPuzzleSolved === true){
            this.paintingOnWall = this.add.image(606, 122, 'painting').setInteractive();
        }else{
            this.paintingOnWall = this.add.image(606, 122, 'painting').setInteractive().setRotation(0.15);
        }

        // Keeping the safe open while switching scenes
        if(isSafeOpen === true){
            this.openedSafe.setVisible(true);
        }else{
            this.openedSafe.setVisible(false);
        }

        bgCommonRoom.setOrigin(0);

        //assets visibility
        dirArrowToEngineRoom.setAlpha(0.2);
        dirArrowToControlRoom.setAlpha(0.2);
        key.setVisible(false);

        //assets scale
        bgCommonRoom.setScale(1.425, 1.1);
        dirArrowToEngineRoom.setScale(0.3);
        dirArrowToControlRoom.setScale(0.3);
        this.openedSafe.setScale(1.5, 1.1);
        key.setScale(0.2);

        this.paintingOnWall.setScale(0.11);

        //random number
        value = Phaser.Math.Between(1, 10);

        //assets events
        dirArrowToEngineRoom.on('pointerdown', this.onEngineDoorClick, this);
        dirArrowToControlRoom.on('pointerdown', this.onControlDoorClick, this);
        this.paintingOnWall.on('pointerdown', this.wallPaintingRotation, this);
        this.safeRec.on('pointerdown', this.openSafe, this);
        key.on('pointerdown', this.pickUpSafeKey, this);

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

    wallPaintingRotation(){
        timesClicked +=1;
        if(timesClicked >= value && paintingPuzzleSolved == false){
            paintingPuzzleSolved = true;
            key.setVisible(true).setRotation(1.5);
            this.tweens.add({
                targets: this.paintingOnWall , //your image that must spin
                rotation: -0.010, //rotation value must be radian
                duration: 500 //duration is in milliseconds
            });
        }
    }
    pickUpSafeKey(){
        foundSafeKey = true;
        key.setVisible(false);
    }

    openSafe(){
        if(paintingPuzzleSolved === true){
            this.openedSafe.setVisible(true);
            isSafeOpen = true;
        }else{
            console.log("You need a key!");
        }
    }

    update() {


    } //end update
} //end title scene