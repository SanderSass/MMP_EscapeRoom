var intro
var start
class Intro extends Phaser.Scene {
    constructor() {
        super('Intro');
    }

    preload() {
        this.roomName;
        this.load.image('btnStart', 'assets/btnStart.png');
        this.scale.setGameSize(2300, 1120);
        this.load.video('intro', 'assets/video/mmp_intro.mp4', 'loadeddata', false, true);
    } //end preload

    create() {
        intro = this.add.video(1150, 600, 'intro');
        intro.setScale(1.2);
        intro.play(true);
        intro.setPaused(true);
        intro.setLoop(false);

        start = this.add.image(1150, 700, 'btnStart').setInteractive();

        //assets visibility
        start.setVisible(true);

        //assets position

        //assets scale
        start.setScale(2);

        //assets Events
        //start.on('pointerdown', this.onStartClick(), this);

        start.on('pointerover', function () {
            start.setAlpha(1);
            start.on('pointerout', function () {
                start.setAlpha(0);
            });
        });
    } //end create

    // OnClicks
    onStartClick(){
        this.scene.start("engineRoom");

    }

    update() {

    } //end update
} //end title scene