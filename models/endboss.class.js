/**
 * The Endboss class represents the final boss character in the game, with movement, animation, and dying behavior.
 * @class
 */

class Endboss extends MovableObject {
  y = 175;
  height = 200;
  width = 200;
  energy = 100;
  isEndboss = true;

  dying = false;
  dyingSpeed = 4;
  opacity = 1; 

  offset = {
    top: 20,
    bottom: 35,
    left: 15,
    right: 10,
  };

  Walking_Images = [
    'assets/img/SlimeOrange/SlimeOrange_00000.png',
    'assets/img/SlimeOrange/SlimeOrange_00001.png',
    'assets/img/SlimeOrange/SlimeOrange_00002.png',
    'assets/img/SlimeOrange/SlimeOrange_00003.png',
    'assets/img/SlimeOrange/SlimeOrange_00004.png',
    'assets/img/SlimeOrange/SlimeOrange_00005.png',
    'assets/img/SlimeOrange/SlimeOrange_00006.png',
    'assets/img/SlimeOrange/SlimeOrange_00007.png',
    'assets/img/SlimeOrange/SlimeOrange_00008.png',
    'assets/img/SlimeOrange/SlimeOrange_00009.png',
    'assets/img/SlimeOrange/SlimeOrange_00010.png',
    'assets/img/SlimeOrange/SlimeOrange_00011.png',
    'assets/img/SlimeOrange/SlimeOrange_00012.png',
    'assets/img/SlimeOrange/SlimeOrange_00013.png',
    'assets/img/SlimeOrange/SlimeOrange_00014.png',
    'assets/img/SlimeOrange/SlimeOrange_00015.png',
    'assets/img/SlimeOrange/SlimeOrange_00016.png',
    'assets/img/SlimeOrange/SlimeOrange_00017.png',
    'assets/img/SlimeOrange/SlimeOrange_00018.png',
    'assets/img/SlimeOrange/SlimeOrange_00019.png',
    'assets/img/SlimeOrange/SlimeOrange_00020.png',
    'assets/img/SlimeOrange/SlimeOrange_00021.png',
    'assets/img/SlimeOrange/SlimeOrange_00022.png',
    'assets/img/SlimeOrange/SlimeOrange_00023.png',
    'assets/img/SlimeOrange/SlimeOrange_00024.png',
    'assets/img/SlimeOrange/SlimeOrange_00025.png',
    'assets/img/SlimeOrange/SlimeOrange_00026.png',
    'assets/img/SlimeOrange/SlimeOrange_00027.png',
    'assets/img/SlimeOrange/SlimeOrange_00028.png',
    'assets/img/SlimeOrange/SlimeOrange_00029.png',
  ];

  constructor() {
    super().loadImage('assets/img/SlimeOrange/SlimeOrange_00000.png');
    this.loadImages(this.Walking_Images);

    this.x = 1700 + Math.random() * 200;
    this.speed = 0.3;
    this.isStunned = false;
    this.animate();
    this.moveTowardsPlayer();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.Walking_Images);
    }, 100);
  }

  moveTowardsPlayer() {
  const moveInterval = setInterval(() => {
    if (!this.world || this.dying) return;
    if (this.isStunned) return;

    const playerX = this.world.character.x;
    const distance = Math.abs(this.x - playerX);

    if (this.x > playerX + 20) {
      this.moveLeft();
      this.otherDirection = true;
    } else if (this.x < playerX - 20) {
      this.moveRight();
      this.otherDirection = false;
    } else {
      this.x += (Math.random() - 0.5) * 1;
    }
  }, 50);

    setInterval(() => {
      if (this.dying) return;

      if (this.world.isOnScreen(this)) {
        this.speed = 0.5 + Math.random() * 0.7;
      }

      if (this.energy <= 75) {
        this.speed += 1.0;
      }
      if (this.energy <= 50) {
        this.speed += 1.5;
      }
      if (this.energy <= 25) {
        this.speed += 2.0;
      }
    }, 1000 + Math.random() * 1500);
  }

  pauseMovement() {
  this.isStunned = true;
  setTimeout(() => {
    this.isStunned = false;
  }, 1000);
}

  takeHit(damage) {
    this.energy -= damage;
    if (this.energy <= 0) {
      this.energy = 0;
      this.dying = true;
      this.dyingAnimation();
    }
  }

  dyingAnimation() {
    const dyingInterval = setInterval(() => {
      if (this.width > 0 && this.height > 0 && this.opacity > 0) {
        this.width -= this.dyingSpeed;
        this.height -= this.dyingSpeed;
        this.y += this.dyingSpeed / 2;
        this.opacity -= 0.02;
        if (this.opacity < 0) this.opacity = 0;
      } else {
        clearInterval(dyingInterval);
        this.markedForDeletion = true;
        if (this.world) {
          this.world.pause();
          showWinScreen();
        }
      }
    }, 50);
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    super.draw(ctx);
    ctx.restore();
  }
}
