class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    F = false;

    constructor() {
        this.keyPressEvents();
        this.touchEvents();
    }


    /**
     * calls functions of keyboard
     */
    keyPressEvents() {
        this.keydownEvent();
        this.keyupEvent();
    }


    /**
     * if the buttons are activated
     */
    keydownEvent() {
        window.addEventListener("keydown", (event) => {
            if (event.keyCode == 39) {
                keyboard.RIGHT = true;
            }

            if (event.keyCode == 37) {
                keyboard.LEFT = true;
            }

            if (event.keyCode == 38) {
                keyboard.UP = true;
            }

            if (event.keyCode == 40) {
                keyboard.DOWN = true;
            }

            if (event.keyCode == 32) {
                keyboard.SPACE = true;
            }

            if (event.keyCode == 70) {
                keyboard.F = true;
            }
        });
    }


    /**
     * if the buttons are not activated
     */
    keyupEvent() {
        window.addEventListener("keyup", (event) => {
            if (event.keyCode == 39) {
                keyboard.RIGHT = false;
            }

            if (event.keyCode == 37) {
                keyboard.LEFT = false;
            }

            if (event.keyCode == 38) {
                keyboard.UP = false;
            }

            if (event.keyCode == 40) {
                keyboard.DOWN = false;
            }

            if (event.keyCode == 32) {
                keyboard.SPACE = false;
            }

            if (event.keyCode == 70) {
                keyboard.F = false;
            }
        });
    }


    /**
     * calls all functions for touch events
     */
    touchEvents() {
        this.moveLeftstart();
        this.moveLeftstop();
        this.moveRightstart();
        this.moveRightstop();
        this.jumpStart();
        this.jumpStop();
        this.throwBottlestart();
        this.throwBottlestop();
    }


    /**
     * touch event for moving left
     */
    moveLeftstart() {
        document.getElementById('btnLeft').addEventListener('touchstart', () => {
            this.LEFT = true;
            document.getElementById('btnLeft').classList.add('buttonOnTouch');
        });
    }
    moveLeftstop() {
        document.getElementById('btnLeft').addEventListener('touchend', () => {
            this.LEFT = false;
            document.getElementById('btnLeft').classList.add('buttonOnTouch');
        });
    }


    /**
     * touch event for moving right
     */
    moveRightstart() {
        document.getElementById('btnRight').addEventListener('touchstart', () => {
            this.RIGHT = true;
            document.getElementById('btnRight').classList.add('buttonOnTouch');
        });
    }

    moveRightstop() {
        document.getElementById('btnRight').addEventListener('touchend', () => {
            this.RIGHT = false;
            document.getElementById('btnRight').classList.add('buttonOnTouch');
        });
    }


    /**
     * touch event for jumping
     */
    jumpStart() {
        document.getElementById('btnJump').addEventListener('touchstart', () => {
            this.SPACE = true;
            document.getElementById('btnJump').classList.add('buttonOnTouch');
        });
    }

    jumpStop() {
        document.getElementById('btnJump').addEventListener('touchend', () => {
            this.SPACE = false;
            document.getElementById('btnJump').classList.add('buttonOnTouch');
        });
    }


    /**
     * touch event for throwing bottle
     */
    throwBottlestart() {
        document.getElementById('btnThrow').addEventListener('touchstart', () => {
            this.F = true;
            document.getElementById('btnThrow').classList.add('buttonOnTouch');
        });
    }

    throwBottlestop() {
        document.getElementById('btnThrow').addEventListener('touchend', () => {
            this.F = false;
            document.getElementById('btnThrow').classList.add('buttonOnTouch');
        });
    }
}