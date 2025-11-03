/**
* Represents the health bar of the end boss.
* Updates the displayed image based on the boss's current health percentage.
*
* @class EndbossStatusBar
* @extends DrawableObject
*/
class EndbossStatusBar extends DrawableObject {
/**
* Array of image paths representing different health states.
* @type {string[]}
*/
IMAGES = [
  'assets/img/UIBars/Red00.png',
  'assets/img/UIBars/Red25.png',
  'assets/img/UIBars/Red50.png',
  'assets/img/UIBars/Red75.png',
  'assets/img/UIBars/Red100.png',
];

/**
* Current health percentage of the boss (0-100).
* @type {number}
* @default 100
*/
percentage = 100;

/**
* Creates an instance of EndbossStatusBar and initializes its position, size, and images.
*/
constructor() {
  super();
  this.loadImages(this.IMAGES);
  this.x = 530;
  this.width = 170;
  this.height = 20;
  this.setPercentage(100);
}

/**
* Adjusts the vertical position of the health bar relative to the canvas height.
* @param {HTMLCanvasElement} canvas - The canvas to adjust the position for.
*/
adjustPosition(canvas) {
  this.y = Math.max(10, canvas.height * 0.02);
}

/**
* Sets the health percentage and updates the displayed image.
* @param {number} percentage - Health percentage (0-100).
*/
setPercentage(percentage) {
  this.percentage = percentage;
  const imageIndex = this.resolveImageIndex();
  this.img = this.imageCache[this.IMAGES[imageIndex]];
}

/**
* Determines which image index to display based on the current health percentage.
* @returns {number} Index of the image in the IMAGES array.
*/
resolveImageIndex() {
  if (this.percentage === 100) {
    return 4;
  } else if (this.percentage >= 75) {
    return 3;
  } else if (this.percentage >= 50) {
    return 2;
  } else if (this.percentage >= 25) {
    return 1;
  } else {
    return 0;
  }
}
}