/**
* Represents static background elements in the game world.
* Extends {@link MovableObject} to allow positioning and potential future movement.
*
* @class BackgroundObject
* @extends MovableObject
*/
class BackgroundObject extends MovableObject {
/**
* The width of the background object in pixels.
* @type {number}
* @default 720
*/
width = 720;

/**
* The height of the background object in pixels.
* @type {number}
* @default 480
*/
height = 480;

/**
* Creates a new background object with the given image and position.
*
* @param {string} imagePath - Path to the background image file.
* @param {number} x - The x-coordinate of the object on the canvas.
* @param {number} y - The y-coordinate of the object on the canvas.
*/
constructor(imagePath, x, y) {
  super().loadImage(imagePath);
  this.x = x;
  this.y = y;
  }
}
