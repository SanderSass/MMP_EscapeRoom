class EngineRoom extends Phaser.Scene {
    constructor() {
        super('engineRoom')
    }
    preload() {
        this.roomName;
        this.oxygenValve;

        this.load.image('engineRoom', 'assets/engineRoom.png');
        this.load.image('dirArrowToCommonRoom', 'assets/directionArrowRight.png');
        this.load.image('oxygenValve', 'assets/valve.png');

    } //end preload

    create() {

        this.roomName = this.add.text(20, 20, 'Engine room', { fontSize: '30px', fill: '#FFFFFF' });
        this.roomName.setDepth(1);

        var bgEngineRoom = this.add.image(0, 0, 'engineRoom').setInteractive();
        this.oxygenValve = this.add.image(567, 139, 'oxygenValve').setInteractive();
        var dirArrowToCommonRoom = this.add.image(1450, 100, 'dirArrowToCommonRoom').setInteractive();


        //assets visibility
        dirArrowToCommonRoom.setAlpha(0.2);

        //assets position
        bgEngineRoom.setOrigin(0);
        this.oxygenValve.setOrigin(0.5);

        //assets scale
        dirArrowToCommonRoom.setScale(0.3);

        //assets Events
        dirArrowToCommonRoom.on('pointerdown', this.onCommonDoorClick, this);
        this.oxygenValve.on('pointerdown', this.rotateValve, this);

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
    rotateValve(){
        console.log('clicked');
        this.oxygenValve.rotate += 0.05;
    }

    update() {

    } //end update


} //end gameScene