class StatusBarBottle extends DrawableObject {

    bottleDepot = [];
    collectedBottles= 0;

    imagesBottle = [
        'img/7_statusbars/3_icons/icon_salsa_bottle.png'
    ];


    constructor() {
        super();
        this.loadImage(this.imagesBottle[0]);
        this.x = 115;
        this.y = 62;
        this.width = 60;
        this.height = 50;
    }
}