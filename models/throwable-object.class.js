class ThrowableObject extends MovableObject {
    
    Ball_Images = [
        '../assets/img/Bullet/Bullet1.png',
        '../assets/img/Bullet/Bullet2.png',
        '../assets/img/Bullet/Bullet3.png',
        '../assets/img/Bullet/Bullet4.png',
        '../assets/img/Bullet/Bullet5.png',
    ]

    constructor(x, y) {
        super().loadImage(this.Ball_Images[0]);
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.loadImages(this.Ball_Images);
        this.throw();        
    }

    throw() {        
        this.speedY = 7;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
        this.animateThrow();
    }

    animateThrow() {
        this.animationInterval = setInterval(() => {
            const gradient = this.speedY;

            if (gradient > 6) {
                this.playAnimation([this.Ball_Images[0]]); 
            } else if (gradient > 2) {
                this.playAnimation([this.Ball_Images[1]]);
            } else if (gradient > -2) {
                this.playAnimation([this.Ball_Images[2]]); 
            } else if (gradient > -6) {
                this.playAnimation([this.Ball_Images[3]]);
            } else {
                this.playAnimation([this.Ball_Images[4]]);
            }
        }, 50);
    }
}