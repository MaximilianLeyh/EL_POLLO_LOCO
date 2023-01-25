class BottleSplash extends MovableObject {
    
    width = 70;
    height = 70;

    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    }

    imagesBottleSplash = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage(this.imagesBottleSplash[0]);
        this.loadImages(this.imagesBottleSplash);
        this.x = x;
        this.y = y;
        this.animate();
    }

    
    /**
     * animates the images for bottleSplash
     */
    animate() {
        setInterval(() => this.playAnimation(this.imagesBottleSplash), 200);
    }
}