var foundFuelCan = false;
var fusePlaced = false;
class ControlRoom extends Phaser.Scene {
    constructor() {
        super('controlRoom')
    }

    preload() {
        this.roomName;
        this.fuelCan;
        this.fuseToPlace;
        this.load.image('dirArrowLeft', 'assets/directionArrow.png');
        this.load.image('controlRoom', 'assets/controlRoom.png');
        this.load.image('fuelCan', 'assets/Fuel.png');
        this.load.image('fuseToPlace', 'assets/Fuse.png');
        this.load.image('redButton', 'assets/redButton.png');

    } //end preload

    create() {
        this.roomName = this.add.text(20, 20, 'Control room', { fontSize: '20px', fill: '#FFFFFF' });
        this.roomName.setDepth(1);
        var bgControlRoom = this.add.image(0, 0, 'controlRoom').setInteractive();
        var redButton = this.add.image(1294, 136, 'redButton').setInteractive();
        var dirArrowToCommonRoom = this.add.image(50, 100, 'dirArrowLeft').setInteractive();
        var fuelStatus = this.add.rectangle(1120, 167, 58, 16, 0xFF0000).setInteractive();
        var fusePlacementSpot = this.add.rectangle(937, 118, 40, 18, 0x000000).setInteractive();
        this.fuseToPlace = this.add.image(937, 118, 'fuseToPlace');
        this.fuelCan = this.add.image(708, 202, 'fuelCan').setInteractive();
        bgControlRoom.setOrigin(0);
        bgControlRoom.setScale(1.02, 1);
        this.fuelCan.setScale(0.38);
        
        //assets visibility
        dirArrowToCommonRoom.setTintFill(0xFF0000);
        this.fuelCan.setAlpha(0.95);
        this.fuseToPlace.setVisible(false).setActive(false);
        //assets scale
        dirArrowToCommonRoom.setScale(0.3);
        redButton.setScale(0.05);
        this.fuseToPlace.setScale(0.3);

        //assets events
        dirArrowToCommonRoom.on('pointerdown', this.onCommonDoorClick, this);
        fusePlacementSpot.on('pointerdown', function() {
            fusePlaced = true;
        });
        //if (foundFuse === true && fuelPoured === true && isCommonRoomDoorUnlocked === true) {
            
        //}

        this.fuelCan.on('pointerdown', this.onFuelCanClick, this);
        if (foundFuelCan) {
            this.fuelCan.setVisible(false);
        } else {
            this.fuelCan.setVisible(true);
        }



        
        
        if (fuelPoured) {
            fuelStatus.setFillStyle(0x00FF00);
        }
        
    } //end create

    // OnClicks
    //placeFuse(){
    //    fusePlaced = true;
    //}
    onFuelCanClick(){
        foundFuelCan = true;
        this.fuelCan.setVisible(false);
    }
    onCommonDoorClick(){
        this.scene.start("commonRoom");
    }

    update() {
        if (foundFuse  && fusePlaced) {
            this.fuseToPlace.setVisible(true);
        } else {
            this.fuseToPlace.setVisible(false);
        }
    } //end update
} //end title scene