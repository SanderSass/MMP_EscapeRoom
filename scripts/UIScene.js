class UIScene extends Phaser.Scene{
    constructor() {
        super({key: 'UIScene', active: true});
    }
    preload(){
        this.fuseVertical;
        this.keyVertical;
        this.sparkPlug;
        this.engineRoomProgressRecWidth = 0;
        this.engineRoomProgressRec;
        this.counterForValve = 0;
        this.counterForLevers = 0;
        this.counterForDoors = 0;

        this.load.image('UIInventory', 'assets/UIInventory.png');
        this.load.image('UIRoomStatus', 'assets/UIRoomStatus.png');
        this.load.image('UIPlayerCards', 'assets/UIPlayerCards.png');
        this.load.image('fuseVertical', 'assets/FuseVertical.png');
        this.load.image('keyVertical', 'assets/Key.png');
        this.load.image('sparkPlug', 'assets/sparkPlug.png');
    }
    create(){
        var UIInventory = this.add.image(750, 265, 'UIInventory').setInteractive();
        var UIRoomStatus = this.add.image(1050, 265, 'UIRoomStatus').setInteractive();
        var UIPlayerCards = this.add.image(400, 290, 'UIPlayerCards').setInteractive();
        this.fuseVertical = this.add.image(639, 263, 'fuseVertical').setInteractive();
        this.keyVertical = this.add.image(673, 263, 'keyVertical').setInteractive();
        this.sparkPlug = this.add.image(710, 263, 'sparkPlug').setInteractive();
        this.engineRoomProgressRec = this.add.rectangle(1070, 240, this.engineRoomProgressRecWidth, 10, 0x32FF00);

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
            this.engineRoomProgressRec.width += 23;
        }
        if (foundSparkPlug === true) {
            this.sparkPlug.setVisible(true);
        }
        if(isLeverPuzzleSolved === true && this.counterForLevers === 0){
            this.counterForLevers++;
            this.engineRoomProgressRec.width += 23;
        }
        if(isDoorUnlocked === true && this.counterForDoors === 0){
            this.counterForDoors++;
            this.engineRoomProgressRec.width += 23;
        }

        //common room
        if(foundRemoteKey === true ){
            this.keyVertical.setVisible(true);
        }

    }
}