var introVideo;
var startButton;
var counter = 0;
var videoStarted = false;
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
        this.load.html("form", "form.html");

    } //end preload

    create() {

        introVideo = this.add.video(1150, 600, 'intro');
        startButton = this.add.image(960, 710, 'btnStart').setInteractive();

        //input form
        this.nameInput = this.add.dom(960, 1000).createFromCache("form");
        this.message = this.add.text(960, 920, "Enter your name", {
            color: "#FFFFFF",
            fontSize: 40,
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.returnKey.on("down", event => {
            let name = this.nameInput.getChildByName("name");
            if(name.value != "") {
                this.message.setText("Hello, " + name.value);
                name.value = "";
            }
        });

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

    //OnClicks
    startVideo(){
        this.nameInput.setVisible(false);
        this.message.setVisible(false);
        this.counterTimer();
        this.isVideoPaused = false;
        introVideo.play(true);
        introVideo.setLoop(false);
        videoStarted = true;
    }

    startGame(){
        this.scene.remove("Intro");
        this.scene.start("engineRoom");
        this.scene.start("UIScene");
        this.scale.setGameSize(1500,310);
    }

    counterTimer(){
        counter++;
    }

    update() {
    if(videoStarted === true){
        counter++
        if(counter === 1000){
            videoStarted = false;
        }
    }
    if(counter === 800){
        this.startGame();
    }

    } //end update
} //end title scene