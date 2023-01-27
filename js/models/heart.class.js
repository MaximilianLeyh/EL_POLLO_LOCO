class Heart extends MoveableObject {
    
    imagesHeart = [
        './img/7_statusbars/3_icons/icon_health.png'
    ];

    constructor(x, y) {
        super().loadImage(this.imagesHeart[0]);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
    }
}