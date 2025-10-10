class MovableObject {
    x = 20;
    y = 300;
    img;
    height = 100;
    width = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {     
    }

    moveLeft() {
    }
}