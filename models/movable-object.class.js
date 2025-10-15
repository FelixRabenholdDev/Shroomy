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
    }
  }

  isColliding(moObj) {
    return (
      this.x + this.width > moObj.x &&
      this.x < moObj.x + moObj.width &&
      this.y + this.height > moObj.y &&
      this.y < moObj.y + moObj.height
    );
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
