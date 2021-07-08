var introVideo
var startButton
class Intro extends Phaser.Scene {
    constructor() {
        super('Intro');
    }
    preload() {

        this.isVideoPaused = true;
        this.scale.setGameSize(1920,1080);
        this.scene.stop("UIScene");

        this.load.video('intro', 'assets/video/mmp_intro.mp4', 'loadeddata', false, true); // 15 seconds
        this.load.image('btnStart', 'assets/btnStart.png');

    } //end preload

    create() {

        introVideo = this.add.video(1150, 600, 'intro');
        startButton = this.add.image(1150, 600, 'btnStart').setInteractive();

        this.isVideoPaused = introVideo.setPaused(this.isVideoPaused);

        //assets visibility
        startButton.setVisible(true);

        //assets depth
        startButton.setDepth(5);

        //assets position

        //assets scale
        introVideo.setScale(1.2);

        //assets Events
        startButton.on('pointerdown', this.startVideo, this);
        startButton.on('pointerdown', function(){
            startButton.setVisible(false);
        });

    } //end create

    OnClicks
    startVideo(){
        this.isVideoPaused = false;
        introVideo.play(true);
        introVideo.setLoop(false);
    }

    update() {

    } //end update
} //end title scene