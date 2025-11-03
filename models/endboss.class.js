/**
* Represents the final boss character in the game.
* Handles movement, animation, dying behavior, and interaction with the player.
*
* @class Endboss
* @extends MovableObject
*/
class Endboss extends MovableObject {
/** Vertical position of the endboss */
/** @type {number} */
y = 175;

/** Width of the endboss sprite */
/** @type {number} */
width = 200;

/** Height of the endboss sprite */
/** @type {number} */
height = 200;

/** Current energy (health) of the endboss */
/** @type {number} */
energy = 100;

/** Flag to mark this object as the endboss */
/** @type {boolean} */
isEndboss = true;

/** Flag to indicate if the endboss is dying */
/** @type {boolean} */
dying = false;

/** Speed of the dying animation */
/** @type {number} */
dyingSpeed = 4;

/** Current opacity for drawing the dying effect */
/** @type {number} */
opacity = 1;

/**
* Collision offset for fine-tuning collision detection
* @type {Object.<string, number>}
* @property {number} top
* @property {number} bottom
* @property {number} left
* @property {number} right
*/
offset = {
  top: 20,
  bottom: 35,
  left: 15,
  right: 10,
};

/** Images used for walking animation */
/** @type {string[]} */
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

/**
* Creates a new Endboss instance, loading images and initializing position and behavior.
*/
constructor() {
  super().loadImage('assets/img/SlimeOrange/SlimeOrange_00000.png');
  this.loadImages(this.Walking_Images);
  this.x = 1700 + Math.random() * 200;
  this.speed = 0.3;
  this.isStunned = false;
  this.animate();
  this.moveTowardsPlayer();
}

/** Animate the walking images */
animate() {
  setInterval(() => {
    this.playAnimation(this.Walking_Images);
  }, 100);
}

/** Move towards the player with random wobble */
moveTowardsPlayer() {
  const moveInterval = setInterval(() => {
    if (!this.world || this.dying || this.isStunned) return;
    const playerX = this.world.character.x;
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
    this.rageMode();
  }, 1000 + Math.random() * 1500);
}

/** Increase speed based on remaining energy */
rageMode() {
  if (this.dying) return;
  if (this.world.isOnScreen(this)) this.speed = 0.5 + Math.random() * 0.7;
  if (this.energy <= 75) this.speed += 1.0;
  if (this.energy <= 50) this.speed += 1.5;
  if (this.energy <= 25) this.speed += 2.0;
}

/** Temporarily pause movement */
pauseMovement() {
  this.isStunned = true;
  setTimeout(() => {
    this.isStunned = false;
  }, 1000);
}

/**
* Applies damage to the endboss and triggers dying behavior if energy reaches 0
* @param {number} damage Amount of damage to apply
*/
takeHit(damage) {
  this.energy -= damage;
  if (this.energy <= 0) {
    this.energy = 0;
    this.dying = true;
    this.dyingAnimation();
  }
}

/** 
* Perform dying animation by shrinking and fading out 
*/
dyingAnimation() {
  const dyingInterval = setInterval(() => {
    if (this.width > 0 && this.height > 0 && this.opacity > 0) {
      this.fadingBoss();
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

/**
* Handles the fading and shrinking of the endboss during dying animation
*/
fadingBoss() {
      this.width -= this.dyingSpeed;
      this.height -= this.dyingSpeed;
      this.y += this.dyingSpeed / 2;
      this.opacity -= 0.02;
      if (this.opacity < 0) 
        this.opacity = 0;
}

/**
* Draws the endboss on the canvas, respecting current opacity.
* @param {CanvasRenderingContext2D} ctx The rendering context
*/
draw(ctx) {
  ctx.save();
  ctx.globalAlpha = this.opacity;
  super.draw(ctx);
  ctx.restore();
}
}