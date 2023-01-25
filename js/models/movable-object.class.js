class MovableObject extends DrawableObject {

    speed = 0.15;
    speedY = 0;
    acceleration = 1;
    changeDirection = false;
    energy = 100;
    lastHit = 0;
    attack = false;
    endGame = false;


    /**
     * load the animations of the images
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * for moving right
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * for moving left
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * apply gravitiy on elements for the y-axis
     */
    applyGravity() {
        setInterval(() => {
            if(this.aboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }


    /**
     * returns object back to the ground or let them fall out of game
     * @returns boolean
     */
    aboveGround() {
        if (this instanceof ThrowableObjects || this.isDead())
            return true;
        else 
            return this.y < 175;
        }


    /**
     * animates jumping 
     * @param {number} speed 
     */ 
    jump(speed) {
        this.speedY = speed;
        }


    /**
     * checks if two objects are colliding together
     * offset value adjust object size
     * @param {object} object 
     * @returns boolean
     */
    isColliding(object) {
     return this.rightBorder() > this.leftObjectBorder(object) &&
            this.bottomBorder() > this.topObjectBorder(object) &&
            this.leftBorder() < this.rightObjectBorder(object) &&
            this.topBorder() < this.bottomObjectBorder(object);
    }
    

    rightBorder() {
        return this.x + this.width - this.offset.right;
    }


    leftBorder() {
        return this.x + this.offset.left;
    }


    topBorder() {
        return this.y + this.offset.top;
    }


    bottomBorder() {
        return this.y + this.height - this.offset.bottom;
    }


    rightObjectBorder(object) {
        return object.x + object.width - object.offset.right;
    }


    leftObjectBorder(object) {
        return object.x + object.offset.left;
    }


    topObjectBorder(object) {
        return object.y + object.offset.top;
    }


    bottomObjectBorder(object) {
        return object.y + object.height - object.offset.bottom;
    }


    /**
     * subtracts the damage from enemy  
     * @param {number} damage 
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * collected heart heals you if you are under 100% life
     * @param {number} life 
     */
    heal(life) {
        this.energy += life;
            if (this.energy > 100)
                this.energy = 100;
        }


    /**
     * time limit from the last time you got hurt
     * @returns boolean
     */
    isHurt() {
        let timeSinceLastHit = new Date().getTime() - this.lastHit; 
        return timeSinceLastHit < 500;
    }


    /**
     * object is dead if the lifebar goes to 0
     * @returns boolean
     */
    isDead() {
    return this.energy == 0;
    }
        

    /**
     * Determines coordinates of two objects 
     * and if they are in the given distance
     * offset value adjust object size
     * @param {object} object 
     * @param {number} distance 
     * @returns boolean
     */
    reachedEndboss(object, distance) {
        return this.rightBorder() + distance > this.leftObjectBorder(object);
    }
}