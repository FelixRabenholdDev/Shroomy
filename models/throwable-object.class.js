class ThrowableObject extends MovableObject {
    
    Ball_Images = [
        '../assets/img/Bullet/Bullet1.png',
        '../assets/img/Bullet/Bullet2.png',
        '../assets/img/Bullet/Bullet3.png',
        '../assets/img/Bullet/Bullet4.png',
        '../assets/img/Bullet/Bullet5.png',
    ]

    constructor(x, y) {
        super().loadImage('../assets/img/Bullet/Bullet1.png');
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.throw();
        // this.loadImages(this.Ball_Images);
    }

    throw() {        
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 7;
        }, 25);
    }    
}