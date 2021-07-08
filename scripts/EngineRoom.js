var waterGauge1;
var waterGauge2;
var waterGauge3;
var waterGauge4;
var lever1Position;
var lever2Position;
var lever3Position;
var lever4Position;
var lever1Image;
var lever2Image;
var lever3Image;
var lever4Image;
var hintLightRed;
var hintLightGreen;
var waterPresureCode;
var waterPresureCodeInput = Array();
var waterPresureWarning;
var codeDisplay;
var isDoorUnlocked = false;
var isLeverPuzzleSolved = false;
var leverSet;
var code;
var dirArrowToCommonRoom;
var foundFuse = false;
var foundSparkPlug = false;
var randomOxygenNr;
class EngineRoom extends Phaser.Scene {
    constructor() {
        super('engineRoom')
    }
    preload() {
        this.roomName;
        this.oxygenValve;
        this.oxygenGauge;
        this.sparkPlug;
        this.oxygenGaugeText = 0;
        this.oxygenGaugeWidthPercentage = 0;
        this.isPuzzleSolved = false;
        this.counter = 0; // counters are used to break out of update loop
        this.fuseCounter = 0;
        this.fuse;

        this.load.image('engineRoom', 'assets/engineRoom.png');
        this.load.image('dirArrowToCommonRoom', 'assets/directionArrowRight.png');
        this.load.image('oxygenValve', 'assets/valve.png');
        this.load.image('oxygenMonitor', 'assets/monitor.png');
        this.load.image('waterPresureMonitor', 'assets/monitor.png');
        this.load.image('hintLightRed', 'assets/lightRed.png');
        this.load.image('hintLightGreen', 'assets/lightGreen.png');
        this.load.image('fuse', 'assets/Fuse.png');
        this.load.image('powerControlPanel', 'assets/powerbox.png');
        this.load.image('leverOff', 'assets/leverOff.png');
        this.load.image('leverOn', 'assets/leverOn.png');
        this.load.image('keypad', 'assets/keypad.png');
        this.load.image('doorKeypadScreen', 'assets/doorKeypadScreen.png');
        this.load.image('sparkPlug', 'assets/sparkPlug.png');
        this.load.image('funnel', 'assets/Funnel.png');
    } //end preload

    create() {

        this.roomName = this.add.text(20, 20, 'Engine room', { fontSize: '20px', fill: '#FFFFFF' });
        this.oxygenGaugeText = this.add.text(585, 65,  this.oxygenGaugeText + '%', { fontSize: '10px', fill: '#D0D0E4' });
        var bgEngineRoom = this.add.image(0, 0, 'engineRoom').setInteractive();

        var funnel = this.add.image(150, 100, 'funnel').setInteractive();
        
        //Keypad
        var doorKeypadScreen = this.add.image(1357, 68, 'doorKeypadScreen').setInteractive();
        var doorKeyPad = this.add.image(1357, 93, 'keypad').setInteractive();
        var keypadNumberC = this.add.rectangle(1330, 124, 20, 20).setInteractive();
        var keypadNumber1 = this.add.rectangle(1330, 57, 20, 20).setInteractive();
        var keypadNumber2 = this.add.rectangle(1357, 57, 20, 20).setInteractive();
        var keypadNumber3 = this.add.rectangle(1383, 57, 20, 20).setInteractive();
        var keypadNumber4 = this.add.rectangle(1330, 80, 20, 20).setInteractive();
        var keypadNumber5 = this.add.rectangle(1357, 80, 20, 20).setInteractive();
        var keypadNumber6 = this.add.rectangle(1383, 80, 20, 20).setInteractive();
        var keypadNumber7 = this.add.rectangle(1330, 102, 20, 20).setInteractive();
        var keypadNumber8 = this.add.rectangle(1357, 102, 20, 20).setInteractive();
        var keypadNumber9 = this.add.rectangle(1383, 102, 20, 20).setInteractive();
        var keypadNumber0 = this.add.rectangle(1357, 124, 20, 20).setInteractive();
        codeDisplay = this.add.text(1333, 12, "", { fontSize: '18px', fill: '#000000' })
        codeDisplay.setVisible(false).setActive(false);

        //Water pressure game
        var powerControlPanel = this.add.image(335, 275, 'powerControlPanel').setInteractive();
        var waterPresureMonitor = this.add.image(290, 65, 'waterPresureMonitor');
        hintLightRed = this.add.image(310, 280, 'hintLightRed');
        hintLightGreen = this.add.image(310, 280, 'hintLightGreen');
        lever1Image = this.add.image(230, 125, 'leverOff').setInteractive();
        lever2Image = this.add.image(270, 125, 'leverOff').setInteractive();
        lever3Image = this.add.image(310, 125, 'leverOff').setInteractive();
        lever4Image = this.add.image(350, 125, 'leverOff').setInteractive();
        var lever1 = this.add.rectangle(230, 125, 20, 30).setInteractive();
        var lever2 = this.add.rectangle(270, 125, 20, 30).setInteractive();
        var lever3 = this.add.rectangle(310, 125, 20, 30).setInteractive();
        var lever4 = this.add.rectangle(350, 125, 20, 30).setInteractive();
        waterPresureCode = this.add.text(255, 60,  waterPresureCode, { fontSize: '10px', fill: '#D0D0E4' });
        waterPresureCode.text = "";
        waterPresureWarning = this.add.text(255, 43,  "Emergency", { fontSize: '10px', fill: '#D0D0E4' });

        //Spark plug
        this.sparkPlug = this.add.image(470, 170, 'sparkPlug').setInteractive();
        //Oxygen game
        this.oxygenValve = this.add.image(567, 139, 'oxygenValve').setInteractive();
        this.oxygenGauge = this.add.rectangle(535, 45, this.oxygenGaugeWidthPercentage, 5, 0xBF0000).setInteractive();
        this.oxygenGaugeTwo = this.add.rectangle(535, 55, this.oxygenGaugeWidthPercentage, 5, 0xBF0000).setInteractive();
        this.oxygenGaugeThree = this.add.rectangle(535, 65, this.oxygenGaugeWidthPercentage, 5, 0xBF0000).setInteractive();
        var oxygenMonitor = this.add.image(565, 60, 'oxygenMonitor');
        dirArrowToCommonRoom = this.add.image(1450, 100, 'dirArrowToCommonRoom').setInteractive();
        this.fuse = this.add.image(750, 172, 'fuse').setInteractive();
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
        this.fuse.setVisible(false);
        hintLightGreen.setVisible(false);
        keypadNumberC.setVisible(false).setActive(false);
        keypadNumber1.setVisible(false).setActive(false);
        keypadNumber2.setVisible(false).setActive(false);
        keypadNumber3.setVisible(false).setActive(false);
        keypadNumber4.setVisible(false).setActive(false);
        keypadNumber5.setVisible(false).setActive(false);
        keypadNumber6.setVisible(false).setActive(false);
        keypadNumber7.setVisible(false).setActive(false);
        keypadNumber8.setVisible(false).setActive(false);
        keypadNumber9.setVisible(false).setActive(false);
        keypadNumber0.setVisible(false).setActive(false);
        dirArrowToCommonRoom.setVisible(false).setActive(false);
                
        

        //assets position
        bgEngineRoom.setOrigin(0);
        this.oxygenValve.setOrigin(0.5);

        //assets scale
        doorKeyPad.setScale(0.25);
        funnel.setScale(0.7);
        dirArrowToCommonRoom.setScale(0.3);
        this.sparkPlug.setScale(0.3);
        oxygenMonitor.setScale(0.8,0.7);
        hintLightRed.setScale(0.8,0.8);
        hintLightGreen.setScale(0.8,0.8);
        waterPresureMonitor.setScale(0.8,0.7);
        doorKeypadScreen.setScale(0.4);
        this.fuse.setScale(0.3);

        //random number
        randomOxygenNr = Phaser.Math.Between(10, 60);

        //assets Events
        dirArrowToCommonRoom.on('pointerdown', this.onCommonDoorClick, this);
        oxygenValveLeftRec.on('pointerdown', this.rotateValveCounterClockWise, this);
        oxygenValveRightRec.on('pointerdown', this.rotateValveClockWise, this);
        oxygenValveLeftRec.on('pointerdown', this.oxygenGaugeDecrease, this);
        oxygenValveRightRec.on('pointerdown', this.oxygenGaugeIncrease, this);
        this.fuse.on('pointerdown', this.pickUpFuse, this);
        this.sparkPlug.on('pointerdown', this.pickUpSparkPlug, this);
        
        dirArrowToCommonRoom.on('pointerover',function(){
            dirArrowToCommonRoom.setAlpha(1);
            dirArrowToCommonRoom.on('pointerout',function(){
                dirArrowToCommonRoom.setAlpha(0.2);
            });
        });
        
        doorKeyPad.on('pointerover',function(){
            doorKeyPad.setScale(0.6);
            doorKeypadScreen.setY(20);
            doorKeypadScreen.setScale(1.2);
            codeDisplay.setVisible(true).setActive(true);
            keypadNumberC.setActive(true).setVisible(true);
            keypadNumber0.setActive(true).setVisible(true);
            keypadNumber1.setActive(true).setVisible(true);
            keypadNumber2.setActive(true).setVisible(true);
            keypadNumber3.setActive(true).setVisible(true);
            keypadNumber4.setActive(true).setVisible(true);
            keypadNumber5.setActive(true).setVisible(true);
            keypadNumber6.setActive(true).setVisible(true);
            keypadNumber7.setActive(true).setVisible(true);
            keypadNumber8.setActive(true).setVisible(true);
            keypadNumber9.setActive(true).setVisible(true);
            keypadNumberC.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(20);
                doorKeypadScreen.setScale(1.2);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumberC.setVisible(true);
                keypadNumberC.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber0.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(20);
                doorKeypadScreen.setScale(1.2);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber0.setVisible(true);
                keypadNumber0.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber1.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(20);
                doorKeypadScreen.setScale(1.2);
                keypadNumber1.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber1.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber2.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(20);
                doorKeypadScreen.setScale(1.2);
                keypadNumber2.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber2.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber3.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(20);
                doorKeypadScreen.setScale(1.2);
                keypadNumber3.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber3.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber4.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(20);
                doorKeypadScreen.setScale(1.2);
                keypadNumber4.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber4.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber5.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(20);
                doorKeypadScreen.setScale(1.2);
                keypadNumber5.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber5.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber6.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(20);
                doorKeypadScreen.setScale(1.2);
                keypadNumber6.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber6.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber7.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(20);
                doorKeypadScreen.setScale(1.2);
                keypadNumber7.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber7.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber8.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(20);
                doorKeypadScreen.setScale(1.2);
                keypadNumber8.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber8.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber9.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(20);
                doorKeypadScreen.setScale(1.2);
                keypadNumber9.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber9.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            doorKeyPad.on('pointerout',function(){
                doorKeyPad.setScale(0.2);
                doorKeypadScreen.setY(68);
                doorKeypadScreen.setScale(0.4);
                keypadNumber0.setActive(false).setVisible(false);
                keypadNumber1.setActive(false).setVisible(false);
                keypadNumber2.setActive(false).setVisible(false);
                keypadNumber3.setActive(false).setVisible(false);
                keypadNumber4.setActive(false).setVisible(false);
                keypadNumber5.setActive(false).setVisible(false);
                keypadNumber6.setActive(false).setVisible(false);
                keypadNumber7.setActive(false).setVisible(false);
                keypadNumber8.setActive(false).setVisible(false);
                keypadNumber9.setActive(false).setVisible(false);
                codeDisplay.setVisible(false).setActive(false);
            });
        });
        
        keypadNumberC.on('pointerdown',function(){
            waterPresureCodeInput = Array();
        });
        keypadNumber0.on('pointerdown',function(){
            var codeNumToAdd = "0";
            waterPresureCodeInput.push(codeNumToAdd);
        });
        keypadNumber1.on('pointerdown',function(){
            var codeNumToAdd = "1";
            waterPresureCodeInput.push(codeNumToAdd);
        });
        keypadNumber2.on('pointerdown',function(){
            var codeNumToAdd = "2";
            waterPresureCodeInput.push(codeNumToAdd);
        });
        keypadNumber3.on('pointerdown',function(){
            var codeNumToAdd = "3";
            waterPresureCodeInput.push(codeNumToAdd);
        });
        keypadNumber4.on('pointerdown',function(){
            var codeNumToAdd = "4";
            waterPresureCodeInput.push(codeNumToAdd);
        });
        keypadNumber5.on('pointerdown',function(){
            var codeNumToAdd = "5";
            waterPresureCodeInput.push(codeNumToAdd);
        });
        keypadNumber6.on('pointerdown',function(){
            var codeNumToAdd = "6";
            waterPresureCodeInput.push(codeNumToAdd);
        });
        keypadNumber7.on('pointerdown',function(){
            var codeNumToAdd = "7";
            waterPresureCodeInput.push(codeNumToAdd);
        });
        keypadNumber8.on('pointerdown',function(){
            var codeNumToAdd = "8";
            waterPresureCodeInput.push(codeNumToAdd);
        });
        keypadNumber9.on('pointerdown',function(){
            var codeNumToAdd = "9";
            waterPresureCodeInput.push(codeNumToAdd);
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
    pickUpFuse(){
        foundFuse = true;
        this.fuse.setVisible(false);
    }
    pickUpSparkPlug(){
        foundSparkPlug = true;
        this.sparkPlug.setVisible(false);
    }
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
        let num1 = Phaser.Math.Between(1, 9).toString();
        let num2 = Phaser.Math.Between(1, 9).toString();
        let num3 = Phaser.Math.Between(1, 9).toString();
        let num4 = Phaser.Math.Between(1, 9).toString();
        var code = num1.concat(num2,num3,num4);
        return code;
    }
    setLever1Position(){
        if (lever1Position == true) {
            lever1Position = false;
        }else if (lever1Position == false){
            lever1Position = true;
        }
        console.log(lever1Position);
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
        code = "";
        if (waterPresureCodeInput.length <= 4) {
            waterPresureCodeInput.forEach(element => {
                code += element.toString()
            });
        } else {
            waterPresureCodeInput = Array();
        }
        
        codeDisplay.text = code;
        if (lever1Position == waterGauge1 && lever2Position == waterGauge2 && lever3Position == waterGauge3 && lever4Position == waterGauge4) {
            isLeverPuzzleSolved = true;
            this.counter++;
            if(isLeverPuzzleSolved === true && this.counter == 1){
                waterPresureCode.setText(this.getDoorCode());
                this.counter++;
            }
        }

        if (code === waterPresureCode.text && code != "") {
            isDoorUnlocked = true;
        }
        
        if (isDoorUnlocked) {
            dirArrowToCommonRoom.setVisible(true).setActive(true);
            //Jonas add method for updating status bar
            //
            //
        }
    
        //LeverPos
        if (lever1Position === false) {
            lever1Image.setTexture('leverOff');
        }else if (lever1Position === true) {
            lever1Image.setTexture('leverOn');
        }
        if (lever2Position === false) {
            lever2Image.setTexture('leverOff');
        }else if (lever2Position === true) {
            lever2Image.setTexture('leverOn');
        }
        if (lever3Position === false) {
            lever3Image.setTexture('leverOff');
        }else if (lever3Position === true) {
            lever3Image.setTexture('leverOn');
        }
        if (lever4Position === false) {
            lever4Image.setTexture('leverOff');
        }else if (lever4Position === true) {
            lever4Image.setTexture('leverOn');
        }
        // if (lever2Position === waterGauge2) {
        //     hintLightRed.setVisible(false);
        //     hintLightGreen.setVisible(true);
        // }else if (lever2Position !== waterGauge2) {
        //     hintLightRed.setVisible(true);
        //     hintLightGreen.setVisible(false);
        // }


        lever1Image.on('pointerover',function(){
            if(waterGauge1 === lever1Position) {
                    hintLightRed.setVisible(false);
                    hintLightGreen.setVisible(true);
                } else if(waterGauge1 !== lever1Position) {
                hintLightRed.setVisible(true);
                hintLightGreen.setVisible(false);
            }
        });
        lever2Image.on('pointerover',function(){
            if(waterGauge2 === lever2Position) {
                hintLightRed.setVisible(false);
                hintLightGreen.setVisible(true);
            } else if(waterGauge2 !== lever2Position) {
                hintLightRed.setVisible(true);
                hintLightGreen.setVisible(false);
            }
        });
        lever3Image.on('pointerover',function(){
            if(waterGauge3 === lever3Position) {
                hintLightRed.setVisible(false);
                hintLightGreen.setVisible(true);
            } else if(waterGauge3 !== lever3Position) {
                hintLightRed.setVisible(true);
                hintLightGreen.setVisible(false);
            }
        });
        lever4Image.on('pointerover',function(){
            if(waterGauge4 === lever4Position) {
                hintLightRed.setVisible(false);
                hintLightGreen.setVisible(true);
            } else if(waterGauge4 !== lever4Position) {
                hintLightRed.setVisible(true);
                hintLightGreen.setVisible(false);
            }
        });

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
        if(this.oxygenGaugeWidthPercentage >= randomOxygenNr && this.fuseCounter === 0 && foundFuse === false){
            this.fuseCounter++;
            this.fuse.setVisible(true);
        }
    } //end update


} //end gameScene