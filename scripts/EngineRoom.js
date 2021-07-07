class EngineRoom extends Phaser.Scene {
    constructor() {
        super('engineRoom')
    }
    preload() {
        this.roomName;
        this.oxygenValve;
        this.oxygenGauge;
        this.oxygenGaugeText = 0;
        this.oxygenGaugeWidthPercentage = 0;
        this.load.image('engineRoom', 'assets/engineRoom.png');
        this.load.image('dirArrowToCommonRoom', 'assets/directionArrowRight.png');
        this.load.image('oxygenValve', 'assets/valve.png');
        this.load.image('oxygenMonitor', 'assets/monitor.png');
        this.load.image('fuse', 'assets/Fuse.png');

    } //end preload

    create() {

        this.roomName = this.add.text(20, 20, 'Engine room', { fontSize: '20px', fill: '#FFFFFF' });
        this.oxygenGaugeText = this.add.text(585, 65,  this.oxygenGaugeText + '%', { fontSize: '10px', fill: '#D0D0E4' });
        var bgEngineRoom = this.add.image(0, 0, 'engineRoom').setInteractive();
        this.oxygenValve = this.add.image(567, 139, 'oxygenValve').setInteractive();
        this.oxygenGauge = this.add.rectangle(535, 45, this.oxygenGaugeWidthPercentage, 5, 0xBF0000).setInteractive();
        this.oxygenGaugeTwo = this.add.rectangle(535, 55, this.oxygenGaugeWidthPercentage, 5, 0xBF0000).setInteractive();
        this.oxygenGaugeThree = this.add.rectangle(535, 65, this.oxygenGaugeWidthPercentage, 5, 0xBF0000).setInteractive();
        var oxygenMonitor = this.add.image(565, 60, 'oxygenMonitor');
        var dirArrowToCommonRoom = this.add.image(1450, 100, 'dirArrowToCommonRoom').setInteractive();
        var fuse = this.add.image(750, 80, 'fuse').setInteractive();
        var oxygenValveLeftRec = this.add.rectangle(552, 138, 25, 45).setInteractive();
        var oxygenValveRightRec = this.add.rectangle(580, 138, 25, 45).setInteractive();

        //assets depth
        this.roomName.setDepth(1);
        this.oxygenGaugeText.setDepth(2);
        this.oxygenGauge.setDepth(1);
        this.oxygenGaugeTwo.setDepth(1);
        this.oxygenGaugeThree.setDepth(1);

        //assets visibility
        dirArrowToCommonRoom.setAlpha(0.2);

        //assets position
        bgEngineRoom.setOrigin(0);
        this.oxygenValve.setOrigin(0.5);

        //assets scale
        dirArrowToCommonRoom.setScale(0.3);
        oxygenMonitor.setScale(0.8,0.7);
        fuse.setScale(0.3);

        //assets Events
        dirArrowToCommonRoom.on('pointerdown', this.onCommonDoorClick, this);
        oxygenValveLeftRec.on('pointerdown', this.rotateValveCounterClockWise, this);
        oxygenValveRightRec.on('pointerdown', this.rotateValveClockWise, this);
        oxygenValveLeftRec.on('pointerdown', this.oxygenGaugeDecrease, this);
        oxygenValveRightRec.on('pointerdown', this.oxygenGaugeIncrease, this);

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
        if (this.oxygenGaugeWidthPercentage >= 60){
            this.oxygenGaugeWidthPercentage = 0;
            this.oxygenGauge.width = 0;
            this.oxygenGaugeTwo.width = 0;
            this.oxygenGaugeThree.width = 0;
            this.oxygenGaugeText.setText(this.oxygenGaugeWidthPercentage + "%");

        }else{
            this.oxygenGaugeWidthPercentage += 5;
            this.oxygenGauge.width += 5;
            this.oxygenGaugeTwo.width += 2;
            this.oxygenGaugeThree.width += 3.5;
            this.oxygenGaugeText.setText(this.oxygenGaugeWidthPercentage + "%");
        }
    }
    oxygenGaugeDecrease(){
        if (this.oxygenGaugeWidthPercentage <= 0){
            this.oxygenGaugeWidthPercentage = 0;
            this.oxygenGauge.width = 0;
            this.oxygenGaugeTwo.width = 0;
            this.oxygenGaugeThree.width = 0;
        }else{
            this.oxygenGaugeWidthPercentage -= 5;
            this.oxygenGauge.width -= 5;
            this.oxygenGaugeTwo.width -= 2;
            this.oxygenGaugeThree.width -= 3.5;
            this.oxygenGaugeText.setText(this.oxygenGaugeWidthPercentage + "%");
        }
    }

    update() {
        if (this.oxygenGaugeWidthPercentage <= 10){
            this.oxygenGauge.setFillStyle(0xBF0000);
            this.oxygenGaugeTwo.setFillStyle(0xA5A652);
            this.oxygenGaugeThree.setFillStyle(0x3056F9);
        }else if(this.oxygenGaugeWidthPercentage <= 20){
            this.oxygenGauge.setFillStyle(0xD71B1B);
            this.oxygenGaugeTwo.setFillStyle(0xC1C25D);
            this.oxygenGaugeThree.setFillStyle(0x395AE6);
        }else if(this.oxygenGaugeWidthPercentage <= 30){
            this.oxygenGauge.setFillStyle(0xD5441C);
            this.oxygenGaugeTwo.setFillStyle(0xDADB6D);
            this.oxygenGaugeThree.setFillStyle(0x3975E6);
        }else if(this.oxygenGaugeWidthPercentage <= 40){
            this.oxygenGauge.setFillStyle(0xD55D1C);
            this.oxygenGaugeTwo.setFillStyle(0xCEE96D);
            this.oxygenGaugeThree.setFillStyle(0x3987E6);
        }else if(this.oxygenGaugeWidthPercentage <= 50){
            this.oxygenGauge.setFillStyle(0xE4A12E);
            this.oxygenGaugeTwo.setFillStyle(0xDAF968);
            this.oxygenGaugeThree.setFillStyle(0x3996E6);
        }else if(this.oxygenGaugeWidthPercentage <= 60){
            this.oxygenGauge.setFillStyle(0xC4E42E);
            this.oxygenGaugeTwo.setFillStyle(0xE5FF00);
            this.oxygenGaugeThree.setFillStyle(0x39BCE6);
        }

    } //end update


} //end gameScene