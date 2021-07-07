var waterGauge1;
var waterGauge2;
var waterGauge3;
var waterGauge4;
var lever1Position;
var lever2Position;
var lever3Position;
var lever4Position;
var leverSet;
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
        var lever1 = this.add.rectangle(225, 125, 15, 30, 0x6666ff).setInteractive();
        var lever2 = this.add.rectangle(275, 125, 15, 30, 0x6666ff).setInteractive();
        var lever3 = this.add.rectangle(325, 125, 15, 30, 0x6666ff).setInteractive();
        var lever4 = this.add.rectangle(375, 125, 15, 30, 0x6666ff).setInteractive();
        this.oxygenValve = this.add.image(567, 139, 'oxygenValve').setInteractive();
        this.oxygenGauge = this.add.rectangle(505, 50, 10, 5, 0x909B23).setInteractive();
        this.waterPresureGauge = this.add.rectangle(300, 50, 10, 5, 0x909B23).setInteractive();
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

        //Pressure minigame
        lever1Position = false;
        lever2Position = false;
        lever3Position = false;
        lever4Position = false;
        lever1.on('pointerdown', this.setLever1Position, this);
        lever2.on('pointerdown', this.setLever2Position, this);
        lever3.on('pointerdown', this.setLever3Position, this);
        lever4.on('pointerdown', this.setLever4Position, this);
        leverSet = Phaser.Math.Between(1, 4);

        switch (leverSet) {
            case 1:
                waterGauge1 = true;
                waterGauge2 = false;
                waterGauge3 = false;
                waterGauge4 = true;
                break;
            case 2:
                waterGauge1 = true;
                waterGauge2 = false;
                waterGauge3 = true;
                waterGauge4 = true;
                break;
            case 3:
                waterGauge1 = false;
                waterGauge2 = false;
                waterGauge3 = false;
                waterGauge4 = true;
                break;
            case 4:
                waterGauge1 = true;
                waterGauge2 = true;
                waterGauge3 = false;
                waterGauge4 = true;
                break;
            default:
                waterGauge1 = true;
                waterGauge2 = true;
                waterGauge3 = true;
                waterGauge4 = true;
                break;
        }
        console.log(waterGauge1, waterGauge2, waterGauge3, waterGauge4);
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
    getDoorCode(){
        var num1 = Phaser.Math.Between(1, 9);
        var num2 = Phaser.Math.Between(1, 9);
        var num3 = Phaser.Math.Between(1, 9);
        var num4 = Phaser.Math.Between(1, 9);
        var code = +num1 + +num2 + +num3 + +num4;
        console.log(code);
        return code;
    }
    setLever1Position(){
        if (lever1Position == true) {
            lever1Position = false;
        }else if (lever1Position == false){
            lever1Position = true;
        }
    }
    setLever2Position(){
        if (lever2Position == true) {
            lever2Position = false;
        }else if (lever2Position == false){
            lever2Position = true;
        }
    }
    setLever3Position(){
        if (lever3Position == true) {
            lever3Position = false;
        }else if (lever3Position == false){
            lever3Position = true;
        }
    }
    setLever4Position(){
        if (lever4Position == true) {
            lever4Position = false;
        }else if (lever4Position == false){
            lever4Position = true;
        }
    }
    oxygenGaugeIncrease(){
        this.oxygenGauge;
    }
    oxygenGaugeDecrease(){
        this.oxygenGauge.width -= 5;
    }

    update() {
        if (lever1Position == waterGauge1 && lever2Position == waterGauge2 && lever3Position == waterGauge3 && lever4Position == waterGauge4) {
        
           console.log(this.getDoorCode());
        }
        console.log(lever1Position, lever2Position, lever3Position, lever4Position);
    } //end update


} //end gameScene