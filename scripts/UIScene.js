class UIScene extends Phaser.Scene{
    constructor() {
        super({key: 'UIScene', active: true});
    }
    preload(){
        this.load.image('UIInventory', 'assets/UIInventory.png');
        this.load.image('UIRoomStatus', 'assets/UIRoomStatus.png');
        this.load.image('UIPlayerCards', 'assets/UIPlayerCards.png');
    }
    create(){
        var UIInventory = this.add.image(750, 265, 'UIInventory').setInteractive();
        var UIRoomStatus = this.add.image(1050, 265, 'UIRoomStatus').setInteractive();
        var UIPlayerCards = this.add.image(400, 290, 'UIPlayerCards').setInteractive();

        //assets scale
        UIInventory.setScale(0.4);
        UIRoomStatus.setScale(0.5, 0.4);
        UIPlayerCards.setScale(0.5);

    }

    update(){
        
    }
}