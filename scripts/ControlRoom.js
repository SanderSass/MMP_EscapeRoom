var foundFuelCan = false;
class ControlRoom extends Phaser.Scene {
    constructor() {
        super('controlRoom')
    }

    preload() {
        this.roomName;
        this.fuelCan;
        this.load.image('dirArrowLeft', 'assets/directionArrow.png');
        this.load.image('controlRoom', 'assets/controlRoom.png');
        this.load.image('fuelCan', 'assets/Fuel.png');
        this.load.image('redButton', 'assets/redButton.png');
    } //end preload

    create() {
        this.roomName = this.add.text(20, 20, 'Control room', { fontSize: '20px', fill: '#FFFFFF' });
        this.roomName.setDepth(1);
        var bgControlRoom = this.add.image(0, 0, 'controlRoom').setInteractive();
        var redButton = this.add.image(1294, 136, 'redButton').setInteractive();
        var dirArrowToCommonRoom = this.add.image(50, 100, 'dirArrowLeft').setInteractive();
        this.fuelCan = this.add.image(708, 202, 'fuelCan').setInteractive();
        bgControlRoom.setOrigin(0);
        bgControlRoom.setScale(1.02, 1);
        this.fuelCan.setScale(0.38);
        
        //assets visibility
        dirArrowToCommonRoom.setTintFill(0xFF0000);
        this.fuelCan.setAlpha(0.95);
        //assets scale
        dirArrowToCommonRoom.setScale(0.3);
        redButton.setScale(0.05);

        //assets events
        dirArrowToCommonRoom.on('pointerdown', this.onCommonDoorClick, this);

        
        this.fuelCan.on('pointerdown', this.onFuelCanClick, this);
        if (foundFuelCan) {
            this.fuelCan.setVisible(false);
        } else {
            this.fuelCan.setVisible(true);
        }
        
    } //end create

    // OnClicks
    onFuelCanClick(){
        foundFuelCan = true;
        this.fuelCan.setVisible(false);
    }
    onCommonDoorClick(){
        this.scene.start("commonRoom");
    }

    update() {

    } //end update
} //end title scene