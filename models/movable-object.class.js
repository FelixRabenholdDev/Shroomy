/**
* Represents a drawable object with movement, collision detection, and state management.
* Extends {@link DrawableObject}.
*
* @class MovableObject
* @extends DrawableObject
*/
class MovableObject extends DrawableObject {
/**
* Horizontal movement speed.
* @type {number}
* @default 0.35
*/
speed = 0.35;

/**
* Whether the object is facing the opposite horizontal direction.
* @type {boolean}
* @default false
*/
otherDirection = false;

/**
* Current vertical speed for jumping/falling.
* @type {number}
* @default 0
*/
speedY = 0;

/**
* Gravity acceleration applied to vertical speed.
* @type {number}
* @default 0.4
*/
acceleration = 0.4;

/**
* Remaining health of the object.
* @type {number}
* @default 100
*/
energy = 100;

/**
* Mana points of the object.
* @type {number}
* @default 100
*/
mana = 100;

/**
* Timestamp of the last time the object was hit.
* @type {number}
* @default 0
*/
lastHit = 0;

/**
* Y-coordinate considered as the ground level for the object.
* @type {number}
* @default 250
*/
groundLevel = 250;

/**
* Collision offsets to fine-tune the hitbox.
* @type {{top: number, bottom: number, left: number, right: number}}
*/
offset = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

/**
* Applies gravity continuously to the object, updating vertical position and speed.
* @returns {void}
*/
applyGravity() {
  setInterval(() => {
    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }
  }, 1000 / 60);
}

/**
* Checks if the object is above the ground level.
* @returns {boolean} True if above ground, false otherwise.
*/
isAboveGround() {
  if (this instanceof ThrowableObject) {
    return true;
  } else {
    return this.y < this.groundLevel;
  }
}

/**
* Checks if this object is colliding with another {@link MovableObject}.
* @param {MovableObject} moObj - The other object to check collision against.
* @returns {boolean} True if a collision is occurring, false otherwise.
*/
isColliding(moObj) {
  return (
    this.x + this.width - this.offset.right > moObj.x + moObj.offset.left &&
    this.x + this.offset.left < moObj.x + moObj.width - moObj.offset.right &&
    this.y + this.height - this.offset.bottom > moObj.y + moObj.offset.top &&
    this.y + this.offset.top < moObj.y + moObj.height - moObj.offset.bottom
  );
}

/**
* Handles the effect of a collision, reducing energy and triggering game over if dead.
* @returns {void}
*/
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

/**
* Reduces mana when an action is performed (e.g., throwing an object).
* @returns {void}
*/
handleMana() {
  this.mana -= 25;
  if (this.mana < 0) {
    this.mana = 0;
  }
}

/**
* Checks if the object is currently in a hurt state.
* @returns {boolean} True if hurt, false otherwise.
*/
isHurt() {
  let timepassed = (new Date().getTime() - this.lastHit) / 1000;
  return timepassed < 1;
}

/**
* Checks if the object is dead (energy is 0).
* @returns {boolean} True if dead, false otherwise.
*/
isDead() {
  return this.energy === 0;
}

/**
* Plays an animation by cycling through a set of images.
* @param {string[]} images - Array of image paths for the animation frames.
* @returns {void}
*/
playAnimation(images) {
  let i = this.currentImage % images.length;
  let path = images[i];
  this.img = this.imageCache[path];
  this.currentImage++;
}

/**
* Moves the object to the right.
* Applies a boost if the object is in the air.
* @returns {void}
*/
moveRight() {
  let boost = this.isAboveGround() ? 1.6 : 1.0;
  this.x += this.speed * boost;
}

/**
* Moves the object to the left.
* Applies a boost if the object is in the air.
* @returns {void}
*/
moveLeft() {
  let boost = this.isAboveGround() ? 1.6 : 1.0;
  this.x -= this.speed * boost;
}

/**
* Makes the object jump by setting vertical speed.
* Plays a jump sound if available in the world’s sound manager.
* @returns {void}
*/
jump() {
  this.speedY = 10;
  if (this.world?.soundManager) {
    this.world.soundManager.play('jump');
  }
}
}