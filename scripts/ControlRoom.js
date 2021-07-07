class ControlRoom extends Phaser.Scene {
    constructor() {
        super('controlRoom')
    }

    preload() {
        this.roomName;

        this.load.image('dirArrowLeft', 'assets/directionArrow.png');
    } //end preload

    create() {
        this.roomName = this.add.text(20, 20, 'Control room', { fontSize: '20px', fill: '#FFFFFF' });
        var dirArrowToCommonRoom = this.add.image(50, 100, 'dirArrowLeft').setInteractive();

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