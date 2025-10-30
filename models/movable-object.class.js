class MovableObject extends DrawableObject {
  speed = 0.35;
  otherDirection = false;
  speedY = 0;
  acceleration = 0.4;
  energy = 100;
  mana = 100;
  lastHit = 0;
  groundLevel = 250;

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
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < this.groundLevel;
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
    this.energy -= 25;

    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }

    if (this.isDead() && this instanceof Character) {
      this.world.gameOver();
    }
  }

  handleMana() {
    this.mana -= 25;

    if (this.mana < 0) {
      this.mana = 0;
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
    let boost = this.isAboveGround() ? 1.6 : 1.0;
    this.x += this.speed * boost;
  }

  moveLeft() {
    let boost = this.isAboveGround() ? 1.6 : 1.0;
    this.x -= this.speed * boost;
  }

  jump() {
    this.speedY = 10;
    if (this.world && this.world.soundManager) {
      this.world.soundManager.play('jump');
    }
  }
}
