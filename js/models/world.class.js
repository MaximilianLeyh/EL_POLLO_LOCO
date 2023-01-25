class World extends DrawWorld {

    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    slowInterval;
    fastInterval;

    character = new Character();
    endboss = new Endboss();
    statusBarHealth = new StatusBarHealth();
    statusBarEndboss = new StatusBarEndboss();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    throwableObject = [];
    deadEnemies = [];
    thrownBottle = [];

    level = level1;
    levelEnd;

    soundCollectCoin = new Audio('audio/coin.mp3');
    soundCollectBottle = new Audio('audio/bottle.mp3');
    soundCollectHeart = new Audio('audio/heart.mp3');
    soundBrokenBottle = new Audio('audio/glass.mp3');
    soundDeadChicken = new Audio('audio/dead.mp3');
    soundDeadBabyChicken = new Audio('audio/chicken.mp3');
    soundEndboss = new Audio('audio/boss.mp3');
    soundWon = new Audio('audio/win.mp3');
    soundLost = new Audio('audio/lose.mp3');
    music = new Audio('audio/music.mp3');

    gameOver = new Endscreen('img/9_intro_outro_screens/game_over/game over.png', this.character.x - 120);
    lost = new Endscreen('img/9_intro_outro_screens/game_over/you lost.png', this.character.x - 120);


    constructor(canvas, keyboard) {
        super();
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        super.drawWorld();
        this.setWorld();
        this.run();
        this.playMusic();
    }


    /**
     * creating the world
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }


    /**
     * main function of all functions
     */
    run() {
        this.slowInterval = setInterval(() => this.slowIntervalAction(), 300);
        this.fastInterval = setInterval(() => this.fastIntervalAction(), 1000 / 60);
    }


    /**
     * calls all slow functions
     */
    slowIntervalAction() {
        this.checkThrowObject();
        this.checkCollisionEnemy();
        this.checkCollisionEndboss();
        this.setLevelEnd();
    }


    /**
     * calls all fast functions
     */
    fastIntervalAction() {
        this.checkCollisionItems();
        this.checkJumpOnEnemy();
        this.checkJumpOnSmallEnemy();
        this.fightEndboss();
        this.endOfGame();
    }


    /**
     * level is ending where the endboss is standing
     */
    setLevelEnd() {
        this.levelEnd = this.endboss.x;
    }


    /**
     * playing sound
     * @param {string} sound 
     * @param {string} volume 
     */
    playSound(sound, volume) {
        if(soundOn()) {
            sound.play();
            sound.volume = volume;
        } else {
            this.pauseSound(sound);
        }
    }


    /**
     * pausing sound
     * @param {string} sound 
     */
    pauseSound(sound) {
        sound.pause();
        sound.volume = 0;
    }


    /**
     * playing music
     */
    playMusic() {
        if(musicOn()) {
            this.music.play();
            this.music.volume = 0.2;
        } else {
            this.pauseMusic();
        }
    }


    /**
     * pausing music
     */
    pauseMusic() {
        this.music.pause();
        this.music.volume = 0;
    }


    /**
     * the strength of the different enemies
     */
    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => this.collision(enemy, 5));
        this.level.smallEnemies.forEach((enemy) => this.collision(enemy, 2));
    }


    /**
     * character loses health by colliding with enemy
     * @param {object} enemy 
     * @param {number} damage 
     */
    collision(enemy, damage) {
        if (this.character.isColliding(enemy) && !this.endboss.endGame) {
            this.character.hit(damage);
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }


    /**
     * conditions of colliding with the endboss
     */
    checkCollisionEndboss() {
        if (this.canCollidEndboss()) {
            this.endboss.attack = true;
            this.character.hit(10);
            this.statusBarHealth.setPercentage(this.character.energy);
        } else {
            this.endboss.attack = false;
        }
    }


    /**
     * character can collid with endboss
     * @returns boolean
     */
    canCollidEndboss() {
        return this.character.reachedEndboss(this.endboss, 50) &&
        !this.endboss.isDead();
    }


    /**
     * conditions of jumping on enemy
     */
    checkJumpOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.canJumpOnEnemy(enemy))
                this.deadEnemy(enemy);
        });
    }

    
    /**
     * conditions of jumping on smallEnemy
     */
    checkJumpOnSmallEnemy() {
        this.level.smallEnemies.forEach((enemy) => {
            if (this.canJumpOnEnemy(enemy))
                this.deadSmallEnemy(enemy);
        });
    }


    /**
     * the character can jump on enemies by colliding
     * @param {object} enemy 
     * @returns boolean
     */
    canJumpOnEnemy(enemy) {
        return this.character.isColliding(enemy) && 
        this.character.aboveGround() &&
        this.character.speedY < 0;
    }


    /**
     * conditions of enemy if it´s dead
     * @param {object} enemy 
     */
    deadEnemy(enemy) {
        let deadChicken = new DeadChicken(enemy.x, enemy.y);
        this.deadEnemies.push(deadChicken);
        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        this.playSound(this.soundDeadChicken, 0.2);
        setTimeout(() => this.deadEnemies.splice(deadChicken), 1000);
    }


    /**
     * conditions of smallEnemy if it´s dead
     * @param {object} enemy 
     */
    deadSmallEnemy(enemy) {
        let deadBabyChicken = new DeadBabyChicken(enemy.x, enemy.y);
        this.deadEnemies.push(deadBabyChicken);
        this.level.smallEnemies.splice(this.level.smallEnemies.indexOf(enemy), 1);
        this.playSound(this.soundDeadBabyChicken, 1);
        setTimeout(() => this.deadEnemies.splice(deadBabyChicken), 1000);
    }


    /**
     * conditons of fighting with the endboss
     */
    fightEndboss() {
        if(this.endboss.isDead()) {
            this.pauseSound(this.soundEndboss);
        } else if (this.canFightEndboss()) {
            this.playSound(this.soundEndboss, 0.1);
            this.music.pause();
            this.checkStartWalkingEndboss();
        } else {
            this.pauseSound(this.soundEndboss);
            this.playMusic();
        }
    }


    /**
     * endboss is attacking if the character reached him
     * @returns boolean
     */
    canFightEndboss() {
        return this.character.reachedEndboss(this.endboss, 520) &&
        !this.character.isDead();
    }


    /**
     * endboss is walking if the character reached him
     */
    checkStartWalkingEndboss() {
        if (this.character.reachedEndboss(this.endboss, 480))
            this.endboss.startWalking = true;
    }


    /**
     * main function for all functions of collision with items
     */
    checkCollisionItems() {
        this.checkCollisionCoin();
        this.checkCollectBottle();
        this.checkCollisionHeart();
        this.checkCollisionThrownBottle();
    }


    /**
     * checks conditions of collectiing coins
     */
    checkCollisionCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let i = this.level.coins.indexOf(coin);
                this.level.coins.splice(i, 1);
                this.statusBarCoin.collectedCoins++;
                this.playSound(this.soundCollectCoin, 1);
            }
        });
    }


    /**
     * checks conditions of collecting bottles
     */
    checkCollectBottle() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                let i = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(i, 1);
                this.statusBarBottle.collectedBottles++;
                this.statusBarBottle.bottleDepot.push(bottle);
                this.playSound(this.soundCollectBottle, 0.2);
            }
        });
    }


    /**
     * checks conditions of colliding with the heart
     */
    checkCollisionHeart() {
        this.level.hearts.forEach((heart) => {
            if (this.character.isColliding(heart)) {
                let i = this.level.hearts.indexOf(heart);
                this.level.hearts.splice(i, 1);
                this.character.heal(40);
                this.statusBarHealth.setPercentage(this.character.energy);
                this.playSound(this.soundCollectHeart, 0.5);
            }
        });
    }


    /**
     * main function for all functions of collision with the bottle
     */
    checkCollisionThrownBottle() {
        this.bottleCollisionSmallEnemy();
        this.bottleCollisionEnemy();
        this.bottleCollisionEndboss();
    }


    /**
     * conditions of hitting the smallEnemies with the bottle
     */
    bottleCollisionSmallEnemy() {
        this.throwableObject.forEach((bottle) => {
            this.level.smallEnemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    this.splashedBottle(bottle);
                    this.deadSmallEnemy(enemy);
                }
            })
        });
    }


    /**
     * conditions of hitting the enemies with the bottle
     */
    bottleCollisionEnemy() {
        this.throwableObject.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    this.splashedBottle(bottle);
                    this.deadEnemy(enemy);
                }
            })
        });
    }


    /**
     * conditions of hitting the endboss with the bottle
     */
    bottleCollisionEndboss() {
        this.throwableObject.forEach((bottle) => {
           if (this.endboss.isColliding(bottle) && !this.endboss.isDead()) {
            this.splashedBottle(bottle);
            this.endboss.hit(10);
            this.statusBarEndboss.setPercentage(this.endboss.energy);
           }
        });
    }


    /**
     * checks conditions of the splashed bottle
     * @param {object} bottle 
     */
    splashedBottle(bottle) {
        let splashedBottle = new BottleSplash(bottle.x, bottle.y);
        this.thrownBottle.push(splashedBottle);
        this.playSound(this.soundBrokenBottle, 1);
        this.throwableObject = [];
        setTimeout(() => this.thrownBottle.splice(splashedBottle), 500);
    }


    /**
     * checks the conditions of throwing a object
     */
    checkThrowObject() {
        if (this.keyboard.F) {
            if (this.canThrowBottle()) {
                let bottle = new ThrowableObjects(this.character.x + 100, this.character.y + 100);
                this.throwableObject.push(bottle);
                this.statusBarBottle.collectedBottles--;
                this.statusBarBottle.bottleDepot.splice(0, 1);
            }
        }
    }


    /**
     * calls function for throwing the bottle if it bigger than 0
     * @returns boolean
     */
    canThrowBottle() {
        return !this.character.changeDirection &&
        this.statusBarBottle.collectedBottles > 0 &&
        !this.endboss.endGame;
    }


    /**
     * sounds in the end
     */
    endOfGame() {
        if (this.character.endGame) {
            let sound = this.soundLost
            this.playEndSound(sound);
        } else if (this.endboss.endGame) {
            let sound = this.soundWon;
            this.playEndSound(sound);
        }
    } 


    /**
     * sound at the end
     * @param {string} sound 
     */
    playEndSound(sound) {
        this.playSound(sound, 1);
        this.pauseMusic();
        this.resetGame(sound);
    }


    /**
     * reset the game und pause the sound
     * @param {string} sound 
     */
    resetGame(sound) {
        clearInterval(this.slowInterval);
        clearInterval(this.fastInterval);
        setTimeout(() => {
            this.restartGame();
            this.pauseMusic(sound);
        }, 8000)
    }


    /**
     * restarts the game after finishing it
     */
    restartGame(){
        document.location.reload();
    }
}