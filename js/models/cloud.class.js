class Clouds extends MovableObject {
    y = 20;
    width = 500;   
    height = 250;

    imagesClouds = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];


    constructor(i, x) {
        super().loadImage(this.imagesClouds[i]); 

        this.x = x;
        this.movingClouds();
    }
    

    /**
     * for moving the clouds to left
     */
    movingClouds() {
        setInterval(() => this.moveLeft(), 1000 / 60);
    }
}

