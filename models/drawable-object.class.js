/**
* Represents any drawable element on the canvas.
* Provides basic functionality for loading and rendering images.
*
* @class DrawableObject
*/
class DrawableObject {
/**
* The x-coordinate position of the object on the canvas.
* @type {number}
* @default 20
*/
x = 20;

/**
* The y-coordinate position of the object on the canvas.
* @type {number}
* @default 250
*/
y = 250;

/**
* The height of the object in pixels.
* @type {number}
* @default 100
*/
height = 100;

/**
* The width of the object in pixels.
* @type {number}
* @default 100
*/
width = 100;

/**
* The main image currently used for rendering.
* @type {HTMLImageElement | undefined}
*/
img;

/**
* A cache storing pre-loaded images by file path.
* @type {Record<string, HTMLImageElement>}
*/
imageCache = {};

/**
* The index of the currently displayed image, useful for animations.
* @type {number}
* @default 0
*/
currentImage = 0;

/**
* Loads a single image and sets it as the active one.
*
* @param {string} path - Path to the image file.
* @returns {void}
*/
loadImage(path) {
  this.img = new Image();
  this.img.src = path;
}

/**
* Draws the object’s image to the provided canvas context.
*
* @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
* @returns {void}
*/
draw(ctx) {
  if (this.img) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

/**
* Preloads multiple images and stores them in the image cache.
*
* @param {string[]} arr - Array of image file paths to load.
* @returns {void}
*/
loadImages(arr) {
  arr.forEach((path) => {
    const img = new Image();
    img.src = path;
    this.imageCache[path] = img;
  });
}
}