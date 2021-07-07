class EngineRoom extends Phaser.Scene {
    constructor() {
        super('engineRoom')
    }
    preload() {
        this.roomName;
        this.oxygenValve;
        this.oxygenGauge;

        this.load.image('engineRoom', 'assets/engineRoom.png');
        this.load.image('dirArrowToCommonRoom', 'assets/directionArrowRight.png');
        this.load.image('oxygenValve', 'assets/valve.png');

    } //end preload

    create() {

        this.roomName = this.add.text(20, 20, 'Engine room', { fontSize: '20px', fill: '#FFFFFF' });
        this.roomName.setDepth(1);

        var bgEngineRoom = this.add.image(0, 0, 'engineRoom').setInteractive();
        this.oxygenValve = this.add.image(567, 139, 'oxygenValve').setInteractive();
        this.oxygenGauge = this.add.rectangle(505, 50, 10, 5, 0x909B23).setInteractive();
        var dirArrowToCommonRoom = this.add.image(1450, 100, 'dirArrowToCommonRoom').setInteractive();
        var oxygenValveLeftRec = this.add.rectangle(552, 138, 25, 45).setInteractive();
        var oxygenValveRightRec = this.add.rectangle(580, 138, 25, 45).setInteractive();

        //assets visibility
        dirArrowToCommonRoom.setAlpha(0.2);

        //assets position
        bgEngineRoom.setOrigin(0);
        this.oxygenValve.setOrigin(0.5);

        //assets scale
        dirArrowToCommonRoom.setScale(0.3);

        //assets Events
        dirArrowToCommonRoom.on('pointerdown', this.onCommonDoorClick, this);
        oxygenValveLeftRec.on('pointerdown', this.rotateValveCounterClockWise, this);
        oxygenValveRightRec.on('pointerdown', this.rotateValveClockWise, this);
        oxygenValveRightRec.on('pointerdown', this.oxygenGaugeIncrease, this);
        oxygenValveRightRec.on('pointerdown', this.oxygenGaugeDecrease, this);

        dirArrowToCommonRoom.on('pointerover',function(){
            dirArrowToCommonRoom.setAlpha(1);
            dirArrowToCommonRoom.on('pointerout',function(){
                dirArrowToCommonRoom.setAlpha(0.2);
            });
        });

    } //end preload

    // onClick methods
    onCommonDoorClick(){
        this.scene.start("commonRoom");
    }
    rotateValveClockWise(){
        this.tweens.add({
            targets: this.oxygenValve, //your image that must spin
            rotation: 5, //rotation value must be radian
            duration: 800 //duration is in milliseconds
        });
    }
    rotateValveCounterClockWise(){
        this.tweens.add({
            targets: this.oxygenValve, //your image that must spin
            rotation: -5, //rotation value must be radian
            duration: 800 //duration is in milliseconds
        });
    }
    oxygenGaugeIncrease(){
        this.oxygenGauge;
    }
    oxygenGaugeDecrease(){
        this.oxygenGauge.width -= 5;
    }

    update() {

    } //end update


} //end gameScene