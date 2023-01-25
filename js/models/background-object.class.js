class BackgroundObject extends MovableObject {
    x = 0;
    y = 0;
    width = 720;   
    height = 480;

    constructor(imagepath, x) {
        super().loadImage(imagepath); 
        this.x = x;
    }
}