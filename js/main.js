//LaserGroup class
class LaserGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene, key) {
		super(scene.physics.world, scene);
        this.key = key;
		// Initialize the group
        this.createMultiple({
            classType: Laser, //Laser class
            frameQuantity: 200, // Create 200 instances in the pool
            active: false,
            visible: false,
            key: key
        });                  
	}

    //fire first availiable bullet
    fireLaser(x, y) {
		// Get the first available sprite in the group
		const laser = this.getFirstDead(false);
		if (laser) {
			laser.fire(x, y);
		}
	}
}
 
//Laser class
class Laser extends Phaser.Physics.Arcade.Sprite 
{
	constructor(scene, x, y, spriteToUse) {
		super(scene, x, y, spriteToUse);
        this.spriteToUse = spriteToUse;
	}
    //Set fired bullet active and visiable
    fire(x, y) {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);
    
        if (this.y < 400) {
            this.setVelocityY(400);
        }else{
            this.setVelocityY(-400);
        }
    }

    preUpdate(time, delta) {
		super.preUpdate(time, delta);
 
		if (this.y <= 0) {
			this.setActive(true);
			this.setVisible(true);
		}
	}
}

//Player and Alien class
class Entity {
    constructor(name, sprite){
        this.name = name;
        this.sprite = sprite;
        this.sprite.setCollideWorldBounds(true);
    }
    
    getXCord(){
        return this.sprite.x;
    }
    
    getYCord(){
        return this.sprite.y;
    }
    
    //Metods for setting velocity of objects
    moveRight(){
        this.sprite.setVelocityX(160);
        this.sprite.setVelocityY(0);
    }

    moveLeft(){
        this.sprite.setVelocityX(-160);
        this.sprite.setVelocityY(0);
    }

    stop(){
        this.sprite.setVelocityY(0);
        this.sprite.setVelocityX(0);
    }
}

//Variables
var W;
var A;
var D;
var laserGroup;
var lastShot;
var changeGunTime1;
var changeGunTime2;
var changeGunTime3;
var changeGunTime4;

class myGame extends Phaser.Scene{
    constructor(){
        super(config);
        this.aliens = [];
    }
    
    preload ()
    {
        //loads assets 
        this.load.image('player1', 'assets/player1.png');
        this.load.image('player2', 'assets/player2.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('alien', 'assets/alien.png');
        this.load.image('shotgun', 'assets/shotgun.png');
        this.load.image('laser', 'assets/laser.png');
        this.load.image('sky', 'assets/background.png');
    }

    create ()
    {
        //Get game start time
        var gameStartTime = new Date();

        //Set vars of how long apart guns must shoot
        var timeTo1stGunChange = 10000;
        var timeTo2dGunChange = 10000;
        var timeTo3dGunChange = 15000;

        //Making var for when guns should change
        changeGunTime1 = new Date(gameStartTime.getTime() + timeTo1stGunChange);
        changeGunTime2 = new Date(gameStartTime.getTime() + timeTo2dGunChange);
        changeGunTime3 = new Date(gameStartTime.getTime() + timeTo3dGunChange);
        changeGunTime4 = new Date(gameStartTime.getTime() + timeTo3dGunChange);

        //get last time a shot was fired
        lastShot = new Date().getTime();

        //set background img
        this.add.image(400,400, 'sky');

        //Making keboard functions
        this.arrow = this.input.keyboard.createCursorKeys();
        W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        //Make diffirent laser groups with diffirent sprites
        this.laserGroup1 = new LaserGroup(this, 'bullet'); 
        this.laserGroup2 = new LaserGroup(this, 'shotgun');
        this.laserGroup3 = new LaserGroup(this, 'laser');
        

        //Make Players
        this.spritePlayer2 = this.physics.add.sprite(380, 50, 'player2');
        this.player2 = new Entity("Player2", this.spritePlayer2);
        this.spritePlayer1 = this.physics.add.sprite(380, 750, 'player1');
        this.player1 = new Entity("Player1", this.spritePlayer1);
        this.aliensGroup = this.physics.add.group();

        //Spawn Aliens
        var startAlienLineX = 20;
        var startAlienLineY = 355;
        for (let j = 0; j < 4; j++) {
            var startAlienLineX = 20;
            for (let k = 0; k < 20; k++) {
                let spriteAlien = this.aliensGroup.create(startAlienLineX, startAlienLineY, 'alien');
                let alien = new Entity("alien"+ j + '_' + k , spriteAlien);
                startAlienLineX += 40;
                this.aliens.push(alien);
                console.log(alien.getXCord());
            }
            startAlienLineY += 30;
        }

        //COLLIDERS / OVERLAPS
        this.physics.add.collider(this.spritePlayer1, this.aliensGroup, function alienHitsPlayer1 (player, alien)
        {
            player.disableBody(true, true);
            alien.disableBody(true, true);
        }, null, this);

        this.physics.add.collider(this.spritePlayer2, this.aliensGroup, function alienHitsPlayer2 (player, alien)
        {
            player.disableBody(true, true);
            alien.disableBody(true, true);
        }, null, this);
        
        //bullet and alien collider
        this.physics.add.collider(this.aliensGroup, this.laserGroup1, function alienHitbyBulleteBullet1 (alien, bullet)
        {
            alien.disableBody(true, true);
            bullet.disableBody(false, true);
        }, null, this);

        this.physics.add.collider(this.aliensGroup, this.laserGroup2, function alienHitbyBulleteBullet2 (alien, bullet)
        {
            alien.disableBody(true, true);
            bullet.disableBody(false, true);
        }, null, this);

        this.physics.add.collider(this.aliensGroup, this.laserGroup3, function alienHitbyBulleteBullet3 (alien, bullet)
        {
            alien.disableBody(true, true);
            bullet.disableBody(false, true);
        }, null, this);
        
        //playyer2 overlaps
        this.physics.add.overlap(this.spritePlayer2, this.laserGroup1, function player2HitbyBullet1 (player, laser)
        {
            player.disableBody(true, true);
            laser.disableBody(true, true);
        }, null, this);

        this.physics.add.overlap(this.spritePlayer2, this.laserGroup2, function player2HitbyBullet2 (player, laser)
        {
            player.disableBody(true, true);
            laser.disableBody(true, true);
        }, null, this);

        this.physics.add.overlap(this.spritePlayer2, this.laserGroup3, function player2HitbyBullet3 (player, laser)
        {
            player.disableBody(true, true);
            laser.disableBody(true, true);
        }, null, this);

        //player1 overlaps
        this.physics.add.overlap(this.spritePlayer1, this.laserGroup1, function player1HitbyBullet1 (player, laser)
        {
            player.disableBody(true, true);
            laser.disableBody(true, true);
        }, null, this);

        this.physics.add.overlap(this.spritePlayer1, this.laserGroup2, function player1HitbyBullet2 (player, laser)
        {
            player.disableBody(true, true);
            laser.disableBody(true, true);
        }, null, this);

        this.physics.add.overlap(this.spritePlayer1, this.laserGroup3, function player1HitbyBullet3 (player, laser)
        {
            player.disableBody(true, true);
            laser.disableBody(true, true);
        }, null, this);

    }

    //Methods for firing and spacing bullets as to not kill shooting player
    firelaserPlayer2(laserGroup, player, spaceBullets){
        laserGroup.fireLaser(player.getXCord(), player.getYCord() + spaceBullets);
    }
    firelaserPlayer1(laserGroup, player, spaceBullets){
        laserGroup.fireLaser(player.getXCord(), player.getYCord() - spaceBullets);
    }

    update(){
        //Set shot frequency
        this.shotFrequency = 250;

        //Player2 movement
        if (this.arrow.right.isDown) {
            this.player2.moveRight();
        }else{
            this.player2.stop()
        }

        if (this.arrow.left.isDown) {
            this.player2.moveLeft();
        }

        //Player1 movement
        if (D.isDown) {
            this.player1.moveRight();
        }else{
            this.player1.stop();
        }
        
        if (A.isDown) {
            this.player1.moveLeft();
        }

        //Move aliens slowly to players
        var moveAliens = setInterval(() => {
            for (let i = 0; i < this.aliens.length; i++) {
                if (this.aliens[i].getYCord() < 400) {
                    this.aliens[i].sprite.y -= 0.2;
                }
                if (this.aliens[i].getYCord() >= 400) {
                    this.aliens[i].sprite.y += 0.2;
                }
            }
            //Prevents stacking of order to move the sprite up here ^
            clearInterval(moveAliens);
        }, 1000);
        
        //check for last gunchange and switch to rapid fire
        if (timingCheck >= changeGunTime4.getTime()) {
            this.shotFrequency = 50;
            console.log("4");
        }

        //Shoot gun Player1
        if (this.arrow.up.isDown) {
            //setting shot frequency
            var currentTime = new Date().getTime();
            if (currentTime - lastShot > this.shotFrequency) {
                //check if game time has passed
                var timingCheck = new Date().getTime();
                if (timingCheck >= changeGunTime3.getTime()) {
                    this.firelaserPlayer2(this.laserGroup3, this.player2, 50);
                    console.log("3");
                }else if (timingCheck >= changeGunTime2.getTime()) {
                    this.firelaserPlayer2(this.laserGroup2, this.player2, 30);
                    console.log('2');
                }else if (timingCheck <= changeGunTime1.getTime()) {
                    this.firelaserPlayer2(this.laserGroup1, this.player2, 30);
                    console.log("1");
                }
                lastShot = currentTime;
            }
        }
        
        //Shoot gun Player2
        if (W.isDown) {
            //setting shot frequency
            var currentTime = new Date().getTime();
            if (currentTime - lastShot > this.shotFrequency) {
                //check if game time has passed
                var timingCheck = new Date().getTime();
                if (timingCheck >= changeGunTime4.getTime()) {
                    this.shotFrequency = 50;
                    console.log("4");
                }
                if (timingCheck >= changeGunTime3.getTime()) {
                    this.firelaserPlayer1(this.laserGroup3, this.player1, 50);
                    console.log("3");
                }else if (timingCheck >= changeGunTime2.getTime()) {
                    this.firelaserPlayer1(this.laserGroup2, this.player1, 30);
                    console.log('2');
                }else if (timingCheck <= changeGunTime1.getTime()) {
                    this.firelaserPlayer1(this.laserGroup1, this.player1, 30);
                    console.log("1");
                }
                lastShot = currentTime;
            }
        }
    }
}

//config
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        debug: true
    }
};

//Make game
let game = new Phaser.Game(config);
game.scene.add('scene1', myGame, true, {x: 800, y:800});