class DeadBabyChicken extends MoveableObject {

    width = 40;
    height = 50;

    imagesSmallChickenDead = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor(x, y) {
        super().loadImage(this.imagesSmallChickenDead[0]);
        this.x = x;
        this.y = y;
    }
}