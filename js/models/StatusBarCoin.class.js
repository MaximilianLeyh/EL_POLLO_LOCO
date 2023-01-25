class StatusBarCoin extends DrawableObject {

    collectedCoins = 0;

    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


    constructor() {
        super();
        this.loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.x = -10;
        this.y = 30;
        this.width = 120;
        this.height = 120;
    }
}