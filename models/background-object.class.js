/**
 * The BackgroundObject class represents static background elements in the game world.
 * @class
 */

class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;
    constructor(imagePath, x, y) {
        super().loadImage(imagePath)
        this.y = y;
        this.x = x;
    }
}