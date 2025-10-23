class ThrowableObject extends MovableObject {

    Ball_Images = [

    constructor(x, y) {
        super(x, y);
        this.width = 20;
        this.height = 20;
        this.speed = 5;
        this.loadImages(this.Ball_Images);
    }

    throw(direction) {
        // Implement throw logic
    }
}