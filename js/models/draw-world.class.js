class DrawWorld {


    /**
     * calls all functions for drawing all elements
     */
    drawWorld() {
        this.clearCanvas();
        this.drawLevel();
        this.drawFixedObjects();
        this.drawEndscreen();
        this.repeatDrawFunction();
    }


    /**
     * clears the canvas
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    /**
     * draws the elements for the level
     */
    drawLevel() {
        this.ctx.translate(this.cameraX, 0);
        this.drawBackground();
        this.drawItems();
        this.drawGameCharacters();
        this.ctx.translate(-this.cameraX, 0);
    }


    /**
     * draws the background by adding background and clouds
     */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }


    /**
     * draws all items by adding the collectable items
     */
    drawItems() {
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.hearts);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.thrownBottle);
    }


    /**
     * draws the character and enemies
     */
    drawGameCharacters() {
        this.addObjectsToMap(this.level.smallEnemies);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.deadEnemies);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
    }


    /**
     * draws objects that are fixed
     */
    drawFixedObjects() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.drawstatusBarEndboss();
        this.drawstatusBarEndbossIcon();
    }


    /**
     * draws the statusbar of the endboss
     */
    drawstatusBarEndboss() {
        if (this.character.reachedEndboss(this.endboss, 520))
            this.addToMap(this.statusBarEndboss);
    }

    drawstatusBarEndbossIcon() {
        if (this.character.reachedEndboss(this.endboss, 520))
            this.addToMap(this.statusBarEndbossIcon);
    }


    /**
     * two different endscreens when the character or the endboss lost
     */
    drawEndscreen() {
        if (this.character.endGame)
            this.addToMap(this.lost);
        else if (this.endboss.endGame)
            this.addToMap(this.gameOver); 
    }

    /**
     * repeat the drawing
     */
    repeatDrawFunction() {
        self = this;
        requestAnimationFrame(function () {
            self.drawWorld();
        });
    }

    
    /**
     * adding objects to the world
     * @param {array} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(object => this.addToMap(object));
    }


    /**
     * checks if the direction is changed
     * @param {array} object 
     */
    addToMap(object) {
        if(object.changeDirection) {
            this.flipImage(object);
        }

        object.draw(this.ctx)

        if (object.changeDirection) {
            this.flipImageBack(object);
        }
    }


    /**
     * for saving, shifting and reflection
     * @param {array} object 
     */
    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }


    /**
     * direction is going back
     * @param {array} object 
     */
    flipImageBack(object) {
        this.ctx.restore();
        object.x = object.x * -1;
    }
}