class MovableObject {
    x = 20;
    y = 300;    
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