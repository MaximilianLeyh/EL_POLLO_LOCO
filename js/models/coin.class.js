class Coin extends MovableObject {

    offset = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    }

    imagesCoin = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage(this.imagesCoin[0]);
        this.loadImages(this.imagesCoin);
        this.x = x;
        this.y = y;
        this.width = 110;
        this.height = 110; 
        this.animate();
    }

    
    /**
     * animates the coins
     */
    animate() {
        setInterval(() => this.playAnimation(this.imagesCoin), 300);
    }
}