class DeadChicken extends MoveableObject {

    width = 65;
    height = 85;

    imagesChickenDead = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor(x, y) {
        super().loadImage(this.imagesChickenDead[0]);
        this.x = x;
        this.y = y;
    }
}