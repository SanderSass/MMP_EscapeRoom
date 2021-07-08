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
        this.counterForRemoteKey = 0;

        this.load.image('UIInventory', 'assets/UIInventory.png');
        this.load.image('UIRoomStatus', 'assets/UIRoomStatus.png');
        this.load.image('UIPlayerCards', 'assets/UIPlayerCards.png');
        this.load.image('fuseVertical', 'assets/FuseVertical.png');
        this.load.image('keyVertical', 'assets/Key.png');
        this.load.image('sparkPlugAsset', 'assets/sparkPlug.png');
    }
    create(){
        var UIInventory = this.add.image(784, 265, 'UIInventory').setInteractive();
        var UIRoomStatus = this.add.image(1050, 265, 'UIRoomStatus').setInteractive();
        var UIPlayerCards = this.add.image(400, 290, 'UIPlayerCards').setInteractive();
        this.fuseVertical = this.add.image(639, 263, 'fuseVertical').setInteractive();
        this.keyVertical = this.add.image(673, 263, 'keyVertical').setInteractive();
        this.sparkPlug = this.add.image(710, 263, 'sparkPlugAsset').setInteractive();
        this.engineRoomProgressRec = this.add.rectangle(1070, 240, this.engineRoomProgressRecWidth, 10, 0x32FF00);
        this.commonRoomProgressRec = this.add.rectangle(1070, 265, this.commonRoomProgressRecWidth, 10, 0x32FF00);

        //assets visibility
        this.fuseVertical.setVisible(false);
        this.keyVertical.setVisible(false);
        this.sparkPlug.setVisible(false);
        UIPlayerCards.setVisible(false);

        //assets scale
        UIInventory.setScale(0.4);
        UIRoomStatus.setScale(0.5, 0.4);
        UIPlayerCards.setScale(0.5);
        this.fuseVertical.setScale(0.4);
        this.keyVertical.setScale(0.4);
        this.sparkPlug.setScale(0.4);
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
        if(isDoorUnlocked === true && this.counterForDoors === 0){
            this.counterForDoors++;
            this.engineRoomProgressRec.width += 17.25;
        }

        //common room
        if(foundSafeKey === true && this.counterForRemoteKey === 0){
            this.counterForRemoteKey++;
            this.keyVertical.setVisible(true);
            this.commonRoomProgressRec.width += 17.25;
        }

    }
}