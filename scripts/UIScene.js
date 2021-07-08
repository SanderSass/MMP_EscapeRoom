var noteCodeText;
class UIScene extends Phaser.Scene{
    constructor() {
        super({key: 'UIScene', active: true});
    }
    preload(){

        this.fuseVertical;
        this.keyVertical;
        this.sparkPlug;
        this.engineRoomProgressRecWidth = 0;
        this.commonRoomProgressRecWidth = 0;
        this.engineRoomProgressRec;
        this.counterForValve = 0;
        this.counterForLevers = 0;
        this.counterForDoors = 0;
        this.counterForSpark = 0;
        this.counterForSafeKey = 0;
        this.counterForSafe = 0;
        this.counterForNote = 0;
        this.randomNoteCode = 0;


        this.load.image('UIInventory', 'assets/UIInventory.png');
        this.load.image('UIRoomStatus', 'assets/UIRoomStatus.png');
        this.load.image('UIPlayerCards', 'assets/UIPlayerCards.png');
        this.load.image('fuseVertical', 'assets/FuseVertical.png');
        this.load.image('keyVertical', 'assets/Key.png');
        this.load.image('sparkPlugAsset', 'assets/sparkPlug.png');
        this.load.image('NoteAsset', 'assets/Note.png');
    }
    create(){
        var UIInventory = this.add.image(764, 265, 'UIInventory').setInteractive();
        var UIRoomStatus = this.add.image(1050, 265, 'UIRoomStatus').setInteractive();
        var UIPlayerCards = this.add.image(400, 290, 'UIPlayerCards').setInteractive();
        this.fuseVertical = this.add.image(635, 263, 'fuseVertical').setInteractive();
        this.keyVertical = this.add.image(674, 263, 'keyVertical').setInteractive();
        this.sparkPlug = this.add.image(714, 263, 'sparkPlugAsset').setInteractive();
        this.note = this.add.image(767, 263, 'NoteAsset').setInteractive();
        this.engineRoomProgressRec = this.add.rectangle(1070, 240, this.engineRoomProgressRecWidth, 10, 0x32FF00);
        this.commonRoomProgressRec = this.add.rectangle(1070, 265, this.commonRoomProgressRecWidth, 10, 0x32FF00);
        noteCodeText = this.add.text(755, 260, '', { fontSize: '10px', fill: '#b30000' });

        //assets visibility
        this.fuseVertical.setVisible(false);
        this.keyVertical.setVisible(false);
        this.sparkPlug.setVisible(false);
        this.note.setVisible(false);
        noteCodeText.setVisible(false);
        UIPlayerCards.setVisible(false);

        //assets scale
        UIInventory.setScale(0.4);
        UIRoomStatus.setScale(0.5, 0.4);
        UIPlayerCards.setScale(0.5);
        this.fuseVertical.setScale(0.4);
        this.keyVertical.setScale(0.4);
        this.sparkPlug.setScale(0.4);

        //random number
        this.randomNoteCode = Phaser.Math.Between(1000, 9999);
    }

    update(){
        // engine room
        if(foundFuse === true && this.counterForValve === 0){
            this.counterForValve++;
            this.fuseVertical.setVisible(true);
            this.engineRoomProgressRec.width += 17.25;
        }
        if (foundSparkPlug === true && this.counterForSpark === 0) {
            this.counterForSpark++
            this.sparkPlug.setVisible(true);
            this.engineRoomProgressRec.width += 17.25;
        }
        if(isLeverPuzzleSolved === true && this.counterForLevers === 0){
            this.counterForLevers++;
            this.engineRoomProgressRec.width += 17.25;
        }
        if(isEngineRoomDoorUnlocked === true && this.counterForDoors === 0){
            this.counterForDoors++;
            this.engineRoomProgressRec.width += 17.25;
        }
        //common room
        if(foundSafeKey === true && this.counterForSafeKey === 0){
            this.counterForSafeKey++;
            this.keyVertical.setVisible(true);
            this.commonRoomProgressRec.width += 17.25;
        }
        if(isSafeOpen === true && this.counterForSafe === 0){
            this.counterForSafe++;
            this.commonRoomProgressRec.width += 17.25;
        }
        // note found
        if(foundNote === true && this.counterForNote === 0){
            this.counterForNote++;
            noteCodeText.setText(this.randomNoteCode);
            this.note.setVisible(true);
            noteCodeText.setVisible(true);
            this.commonRoomProgressRec.width += 17.25;
        }
    }
}