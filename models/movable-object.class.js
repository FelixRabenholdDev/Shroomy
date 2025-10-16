class MovableObject {
  x = 20;
  y = 250;
  height = 100;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.25;
  otherDirection = false;
  speedY = 0;
  acceleration = 0.4;
  energy = 100;
  lastHit = 0;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60);
  }

  isAboveGround() {
      return this.y < 250;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Endboss || this instanceof Slime) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.lineWidth = 10;
      ctx.strokeStyle = 'blue';
      ctx.stroke();
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 4;
      ctx.strokeRect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
    );
    }
  }

  isColliding(moObj) {
    return (
      this.x + this.width - this.offset.right > moObj.x + moObj.offset.left &&
      this.x + this.offset.left < moObj.x + moObj.width - moObj.offset.right &&
      this.y + this.height - this.offset.bottom > moObj.y + moObj.offset.top &&
      this.y + this.offset.top < moObj.y + moObj.height - moObj.offset.bottom
    );
  }

  handleCollision() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;       
  }

  jump() {
    this.speedY = 10;
  }
}
