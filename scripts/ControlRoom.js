class ControlRoom extends Phaser.Scene {
    constructor() {
        super('controlRoom')
    }

    preload() {
        this.roomName;
        this.load.image('dirArrowLeft', 'assets/directionArrow.png');
        this.load.image('controlRoom', 'assets/controlRoom.png');
    } //end preload

    create() {
        this.roomName = this.add.text(20, 20, 'Control room', { fontSize: '20px', fill: '#FFFFFF' });
        var dirArrowToCommonRoom = this.add.image(50, 100, 'dirArrowLeft').setInteractive();
        var bgControlRoom = this.add.image(0, 0, 'controlRoom').setInteractive();
        bgControlRoom.setOrigin(0);
        bgControlRoom.setScale(1.02, 0.93);
        
        //assets visibility
        dirArrowToCommonRoom.setAlpha(0.2);

        //assets scale
        dirArrowToCommonRoom.setScale(0.3);

        //assets events
        dirArrowToCommonRoom.on('pointerdown', this.onCommonDoorClick, this);

        dirArrowToCommonRoom.on('pointerover',function(){
            dirArrowToCommonRoom.setAlpha(1);
            dirArrowToCommonRoom.on('pointerout',function(){
                dirArrowToCommonRoom.setAlpha(0.2);
            });
        });

    } //end create

    // OnClicks
    onCommonDoorClick(){
        this.scene.start("commonRoom");
    }

    update() {

    } //end update
} //end title scene