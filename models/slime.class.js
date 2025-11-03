/**
* Represents a slime enemy in the game.
* The slime can walk, jump randomly, and be squashed by the player.
*
* @class Slime
* @extends MovableObject
*/
class Slime extends MovableObject {
/**
* Interval ID for random jumping
* @type {number}
*/
jumpInterval;

/**
* Collision offset for the slime
* @type {Object}
*/
offset = {
  top: 11,
  bottom: 8,
  left: 9,
  right: 9,
};

/**
* Indicates if the slime is squashed
* @type {boolean}
*/
isSquashed = false;

/**
* Indicates if the slime is currently jumping
* @type {boolean}
*/
isJumping = false;

/**
* Array of images for walking animation
* @type {string[]}
*/
Walking_Images = [
  'assets/img/SlimeGreen/SlimeBasic_00000.png',
  'assets/img/SlimeGreen/SlimeBasic_00001.png',
  'assets/img/SlimeGreen/SlimeBasic_00002.png',
  'assets/img/SlimeGreen/SlimeBasic_00003.png',
  'assets/img/SlimeGreen/SlimeBasic_00004.png',
  'assets/img/SlimeGreen/SlimeBasic_00005.png',
  'assets/img/SlimeGreen/SlimeBasic_00006.png',
  'assets/img/SlimeGreen/SlimeBasic_00007.png',
  'assets/img/SlimeGreen/SlimeBasic_00008.png',
  'assets/img/SlimeGreen/SlimeBasic_00009.png',
  'assets/img/SlimeGreen/SlimeBasic_00010.png',
  'assets/img/SlimeGreen/SlimeBasic_00011.png',
  'assets/img/SlimeGreen/SlimeBasic_00012.png',
  'assets/img/SlimeGreen/SlimeBasic_00013.png',
  'assets/img/SlimeGreen/SlimeBasic_00014.png',
  'assets/img/SlimeGreen/SlimeBasic_00015.png',
  'assets/img/SlimeGreen/SlimeBasic_00016.png',
  'assets/img/SlimeGreen/SlimeBasic_00017.png',
  'assets/img/SlimeGreen/SlimeBasic_00018.png',
  'assets/img/SlimeGreen/SlimeBasic_00019.png',
  'assets/img/SlimeGreen/SlimeBasic_00020.png',
  'assets/img/SlimeGreen/SlimeBasic_00021.png',
  'assets/img/SlimeGreen/SlimeBasic_00022.png',
  'assets/img/SlimeGreen/SlimeBasic_00023.png',
  'assets/img/SlimeGreen/SlimeBasic_00024.png',
  'assets/img/SlimeGreen/SlimeBasic_00025.png',
  'assets/img/SlimeGreen/SlimeBasic_00026.png',
  'assets/img/SlimeGreen/SlimeBasic_00027.png',
  'assets/img/SlimeGreen/SlimeBasic_00028.png',
  'assets/img/SlimeGreen/SlimeBasic_00029.png',
];

/**
* Creates a new Slime instance with randomized position, speed, and initial animation frame.
*/
constructor() {
  super().loadImage('assets/img/SlimeGreen/SlimeBasic_00000.png');
  this.loadImages(this.Walking_Images);
  this.x = 250 + Math.random() * 1500;
  this.width = 45;
  this.height = 45;
  this.y = 283;
  this.groundLevel = this.y;
  this.speed = 0.15 + Math.random() * 0.35;
  this.currentImage = Math.floor(Math.random() * this.Walking_Images.length);
  this.applyGravity();
  this.animate();
  this.enableRandomJumping();
}

/**
* Starts movement and walking animation intervals.
*/
animate() {
  setInterval(() => {
    this.moveLeft();
  }, 1000 / 60);

  setInterval(() => {
    this.playAnimation(this.Walking_Images);
  }, 100);
}

/**
* Enables the slime to randomly jump at intervals.
*/
enableRandomJumping() {
  this.jumpInterval = setInterval(() => {
    if (!this.isAboveGround() && !this.isJumping) {
      if (Math.random() < 0.03) {
        this.jump();
        this.isJumping = true;
      }
    }
    if (!this.isAboveGround()) {
      this.isJumping = false;
    }
  }, 150);
}

/**
* Makes the slime jump with a randomized vertical speed.
*/
jump() {
  this.speedY = 4 + Math.random() * 5;
  if (this.world && this.world.soundManager && this.world.isOnScreen(this)) {
    this.world.soundManager.play('slimeJump');
  }
}

/**
* Squashes the slime, marking it for deletion after a short delay.
*/
squash() {
  if (this.isSquashed) return;
  this.isSquashed = true;
  this.height = this.height / 2;
  this.y += this.height / 2;
  clearInterval(this.animInterval);
  setTimeout(() => {
    this.markedForDeletion = true;
  }, 100);
}
}