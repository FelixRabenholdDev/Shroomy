class MovableObject {
    x = 20;
    y = 250;    
    height = 100;
    width = 100;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {     
    }

    moveLeft() {
    }
}