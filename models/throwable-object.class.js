/**
 * Represents a throwable object that moves, is affected by gravity,
 * and has an animated appearance based on its vertical speed.
 *
 * @class ThrowableObject
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  /**
   * Images used for different frames of the throwable object
   * @type {string[]}
   */
  Ball_Images = [
    'assets/img/Bullet/Bullet1.png',
    'assets/img/Bullet/Bullet2.png',
    'assets/img/Bullet/Bullet3.png',
    'assets/img/Bullet/Bullet4.png',
    'assets/img/Bullet/Bullet5.png',
  ];

  /**
   * Creates a new ThrowableObject at the given coordinates and immediately throws it.
   * 
   * @param {number} x Initial x-coordinate
   * @param {number} y Initial y-coordinate
   */
  constructor(x, y) {
    super().loadImage(this.Ball_Images[0]);
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.loadImages(this.Ball_Images);
    this.throw();
  }

  /**
   * Initiates the throwing motion of the object, applying gravity
   * and horizontal movement over time.
   */
  throw() {
    this.speedY = 7;
    this.applyGravity();
    
    setInterval(() => {
      this.x += 10; // horizontal movement
    }, 25);
    
    this.animateThrow();
  }

  /**
   * Animates the object based on its vertical speed.
   * Different images are displayed depending on whether it is moving up or down.
   */
  animateThrow() {
    setInterval(() => {
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
