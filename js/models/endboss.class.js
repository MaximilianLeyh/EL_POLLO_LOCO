class Endboss extends MovableObject {

    width = 300;
    height = 350;
    speed = 1;
    x = 5500;
    y = 95;
    startWalking = false;
    animationInterval;

    soundHurt = new Audio('audio/chicken.mp3');
    soundDead = new Audio('audio/dead.mp3');
    soundAttack = new Audio('audio/attack.mp3');

    offset = {
        top: 100,
        bottom: 15,
        left: 50,
        right: 50
    };



    imagesEndbossAlert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    imagesEndbossWalking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];


    imagesEndbossAttack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];


    imagesEndbossHurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];


    imagesEndbossDead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    constructor() {
        super().loadImage(this.imagesEndbossAlert[0]);
        this.loadImages(this.imagesEndbossAlert);
        this.loadImages(this.imagesEndbossWalking);
        this.loadImages(this.imagesEndbossAttack);
        this.loadImages(this.imagesEndbossHurt);
        this.loadImages(this.imagesEndbossDead);
        this.setAnimation();
        this.animateMovement();
    }


    /**
     * calls the animations for moving left
     */
    animateMovement() {
        setInterval(() => {
            if (this.canMove()) {
                this.moveLeft();
            }
        }, 100);
    }


    /**
     * the endboss is only walking if he isn´t dead, attacking or gets hurt
     * @returns boolean - if walking is true
     */
    canMove() {
        return this.startWalking &&
        !this.isDead() &&
        !this.attack &&
        !this.isHurt() &&
        !this.world.character.endGame;
    }


    /**
     * calls all animations with a defined number of miliseconds
     */
    setAnimation() {
        this.animationInterval = setInterval(() => this.animation(), 100);
    }


    /**
     * checks all different animations
     */
    animation() {
        if (this.isDead())
            this.endbossDead();
        else if (this.isHurt())
            this.endbossHurt();
        else if (this.attack && !this.world.character.isDead())
            this.endbossAttack();
        else if (this.startWalking && !this.world.character.endGame)
            this.endbossWalk();
        else
            this.endbossAlert();        
    }


    /**
     * checks all conditions if the endboss is dead
     */
    endbossDead() {
        this.world.playSound(this.soundDead, 1);
        this.playAnimation(this.imagesEndbossDead);
        setTimeout(() => {
            clearInterval(this.animationInterval);
            this.speedY = 5;
            this.applyGravity();
            this.endGame = true;
        }, 1500);
    }


    /**
     * if the endboss gets hurt
     */
    endbossHurt() {
        this.playAnimation(this.imagesEndbossHurt);
        this.world.playSound(this.soundHurt, 0.2);
        this.speed++;
    }


    /**
     * animates endboss of alert
     */
    endbossAlert() {
        this.playAnimation(this.imagesEndbossAlert);
    }


    /**
     * animates endboss of attacking
     */
    endbossAttack() {
        this.playAnimation(this.imagesEndbossAttack);
        this.world.playSound(this.soundAttack, 0.2);
    }


    /**
     * animates endboss of walking
     */
    endbossWalk() {
        this.playAnimation(this.imagesEndbossWalking);
    }
}