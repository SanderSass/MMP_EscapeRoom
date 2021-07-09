var timesClicked = 0;
var key;
var value;
var paintingPuzzleSolved = false;
var foundSafeKey = false;
var isSafeOpen = false;
var foundNote = false;
var codeDisplay;
var code;
var keypadCodeInput = Array();
var isCommonRoomDoorUnlocked = false;
var dirArrowToControlRoom;
var foundSparkPlug = false;
class CommonRoom extends Phaser.Scene {
    constructor() {
        super('commonRoom')
    }

    preload() {
        this.roomName;
        this.paintingOnWall;
        this.sparkPlug;
        this.load.image('painting', 'assets/painting.jpg');
        this.load.image('key', 'assets/key.png');
        this.load.image('commonRoom', 'assets/commonRoom.png');
        this.load.image('dirArrowLeft', 'assets/directionArrow.png');
        this.load.image('dirArrowRight', 'assets/directionArrowRight.png');
        this.load.image('openedSafe', 'assets/openSafe.png');
        this.load.image('note', 'assets/Note.png');
        this.load.image('keypad', 'assets/keypad.png');
        this.load.image('doorKeypadScreen', 'assets/doorKeypadScreen.png');
        this.load.image('sparkPlug', 'assets/sparkPlug.png');

    } //end preload

    create() {
        this.roomName = this.add.text(20, 20, 'Common room', { fontSize: '20px', fill: '#FFFFFF' });
        this.roomName.setDepth(1);
        var bgCommonRoom = this.add.image(0, 0, 'commonRoom').setInteractive();
        this.openedSafe = this.add.image(1210, 124, 'openedSafe').setInteractive();
        this.note = this.add.image(1205, 124, 'note').setInteractive();
        this.safeRec = this.add.rectangle(1210, 124, 60, 70).setInteractive();
        var dirArrowToEngineRoom = this.add.image(50, 100, 'dirArrowLeft').setInteractive();
        dirArrowToControlRoom = this.add.image(1450, 100, 'dirArrowRight').setInteractive();
        key = this.add.image(170, 198, 'key').setInteractive();

        //Keypad
        var doorKeypadScreen = this.add.image(1317, 102, 'doorKeypadScreen').setInteractive();
        var doorKeyPad = this.add.image(1317, 130, 'keypad').setInteractive();
        var keypadNumberC = this.add.rectangle(1290, 160, 20, 20).setInteractive();
        var keypadNumber1 = this.add.rectangle(1290, 94, 20, 20).setInteractive();
        var keypadNumber2 = this.add.rectangle(1317, 94, 20, 20).setInteractive();
        var keypadNumber3 = this.add.rectangle(1342, 94, 20, 20,).setInteractive();
        var keypadNumber4 = this.add.rectangle(1290, 116, 20, 20).setInteractive();
        var keypadNumber5 = this.add.rectangle(1317, 116, 20, 20).setInteractive();
        var keypadNumber6 = this.add.rectangle(1342, 116, 20, 20).setInteractive();
        var keypadNumber7 = this.add.rectangle(1290, 138, 20, 20).setInteractive();
        var keypadNumber8 = this.add.rectangle(1317, 138, 20, 20).setInteractive();
        var keypadNumber9 = this.add.rectangle(1342, 138, 20, 20).setInteractive();
        var keypadNumber0 = this.add.rectangle(1317, 160, 20, 20).setInteractive();
        codeDisplay = this.add.text(1294, 47, "", { fontSize: '18px', fill: '#000000' })
        codeDisplay.setVisible(false).setActive(false);

        this.sparkPlug = this.add.image(470, 170, 'sparkPlug').setInteractive();
        //Spark plug
        if (foundSparkPlug) {
            this.sparkPlug.setVisible(false);
        } else {
            this.sparkPlug.setVisible(true);
        }
        

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
        this.note.setVisible(false);
        key.setVisible(false);
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
        dirArrowToControlRoom.setVisible(false).setActive(false);

        //assets scale
        bgCommonRoom.setScale(1.425, 1.1);
        dirArrowToEngineRoom.setScale(0.3);
        dirArrowToControlRoom.setScale(0.3);
        this.openedSafe.setScale(1.5, 1.1);
        this.sparkPlug.setScale(0.3);
        this.note.setScale(0.5);
        key.setScale(0.2);
        doorKeyPad.setScale(0.25);
        doorKeypadScreen.setScale(0.4);

        this.paintingOnWall.setScale(0.11);

        //random number
        value = Phaser.Math.Between(1, 10);

        //assets events
        dirArrowToEngineRoom.on('pointerdown', this.onEngineDoorClick, this);
        dirArrowToControlRoom.on('pointerdown', this.onControlDoorClick, this);
        this.paintingOnWall.on('pointerdown', this.wallPaintingRotation, this);
        this.safeRec.on('pointerdown', this.openSafe, this);
        key.on('pointerdown', this.pickUpSafeKey, this);
        this.note.on('pointerdown', this.pickUpNote, this);
        this.sparkPlug.on('pointerdown', this.pickUpSparkPlug, this);

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
        // KEYPAD EVENTS
        doorKeyPad.on('pointerover',function(){
            doorKeyPad.setScale(0.6);
            doorKeypadScreen.setY(55);
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
                doorKeypadScreen.setY(55);
                doorKeypadScreen.setScale(1.2);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumberC.setVisible(true);
                keypadNumberC.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber0.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(55);
                doorKeypadScreen.setScale(1.2);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber0.setVisible(true);
                keypadNumber0.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber1.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(55);
                doorKeypadScreen.setScale(1.2);
                keypadNumber1.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber1.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber2.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(55);
                doorKeypadScreen.setScale(1.2);
                keypadNumber2.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber2.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber3.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(55);
                doorKeypadScreen.setScale(1.2);
                keypadNumber3.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber3.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber4.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(55);
                doorKeypadScreen.setScale(1.2);
                keypadNumber4.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber4.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber5.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(55);
                doorKeypadScreen.setScale(1.2);
                keypadNumber5.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber5.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber6.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(55);
                doorKeypadScreen.setScale(1.2);
                keypadNumber6.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber6.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber7.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(55);
                doorKeypadScreen.setScale(1.2);
                keypadNumber7.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber7.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber8.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(55);
                doorKeypadScreen.setScale(1.2);
                keypadNumber8.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber8.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            keypadNumber9.on('pointerover',function(){
                doorKeyPad.setScale(0.6);
                doorKeypadScreen.setY(55);
                doorKeypadScreen.setScale(1.2);
                keypadNumber9.setVisible(true);
                codeDisplay.setVisible(true).setActive(true);
                keypadNumber9.on('pointerout',function(){
                    doorKeyPad.setScale(0.6);
                });
            });
            doorKeyPad.on('pointerout',function(){
                doorKeyPad.setScale(0.2);
                doorKeypadScreen.setY(105);
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
            keypadCodeInput = Array();
        });
        keypadNumber0.on('pointerdown',function(){
            var codeNumToAdd = "0";
            keypadCodeInput.push(codeNumToAdd);
        });
        keypadNumber1.on('pointerdown',function(){
            var codeNumToAdd = "1";
            keypadCodeInput.push(codeNumToAdd);
        });
        keypadNumber2.on('pointerdown',function(){
            var codeNumToAdd = "2";
            keypadCodeInput.push(codeNumToAdd);
        });
        keypadNumber3.on('pointerdown',function(){
            var codeNumToAdd = "3";
            keypadCodeInput.push(codeNumToAdd);
        });
        keypadNumber4.on('pointerdown',function(){
            var codeNumToAdd = "4";
            keypadCodeInput.push(codeNumToAdd);
        });
        keypadNumber5.on('pointerdown',function(){
            var codeNumToAdd = "5";
            keypadCodeInput.push(codeNumToAdd);
        });
        keypadNumber6.on('pointerdown',function(){
            var codeNumToAdd = "6";
            keypadCodeInput.push(codeNumToAdd);
        });
        keypadNumber7.on('pointerdown',function(){
            var codeNumToAdd = "7";
            keypadCodeInput.push(codeNumToAdd);
        });
        keypadNumber8.on('pointerdown',function(){
            var codeNumToAdd = "8";
            keypadCodeInput.push(codeNumToAdd);
        });
        keypadNumber9.on('pointerdown',function(){
            var codeNumToAdd = "9";
            keypadCodeInput.push(codeNumToAdd);
        });
    } //end create

    // OnClicks
    onEngineDoorClick(){
        this.scene.start("engineRoom");
    }
    onControlDoorClick(){
        this.scene.start("controlRoom");
    }
    pickUpSparkPlug(){
        foundSparkPlug = true;
        this.sparkPlug.setVisible(false);
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
    pickUpNote(){
        foundNote = true;
        this.note.setVisible(false);
        console.log("Picked up the note...");
    }

    openSafe(){
        if(paintingPuzzleSolved === true && foundSafeKey === true && foundNote === false ){
            this.openedSafe.setVisible(true);
            this.note.setVisible(true);
            this.safeRec.setVisible(false);
            isSafeOpen = true;
        }else if(isSafeOpen && foundNote){
            console.log("There is nothing in the safe");
        }else{
            console.log("You need a key");
        }
    }

    update() {
        code = "";
        if (keypadCodeInput.length <= 4) {
            keypadCodeInput.forEach(element => {
                code += element.toString()
            });
        } else {
            noteCodeText = Array();
        }

        codeDisplay.text = code;

        if (code === noteCodeText.text && code != "") {
            isCommonRoomDoorUnlocked = true;
        }
        if (isCommonRoomDoorUnlocked) {
            dirArrowToControlRoom.setVisible(true).setActive(true);
        }


    } //end update
} //end title scene