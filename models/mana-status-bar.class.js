/**
* Represents a mana status bar in the game UI, updating its appearance based on the current mana percentage.
*
* @class ManaStatusBar
* @extends DrawableObject
*/
class ManaStatusBar extends DrawableObject {
/**
* Array of images representing the mana bar at different percentages
* @type {string[]}
*/
IMAGES = [
  'assets/img/UIBars/Green00.png',
  'assets/img/UIBars/Green25.png',
  'assets/img/UIBars/Green50.png',
  'assets/img/UIBars/Green75.png',
  'assets/img/UIBars/Green100.png',
];

/**
* Current mana percentage (0-100)
* @type {number}
*/
percentage = 100;

/**
* Creates a new ManaStatusBar instance and initializes it at full mana.
*/
constructor() {
  super();
  this.loadImages(this.IMAGES);
  this.x = 20;
  this.width = 150;
  this.height = 20;
  this.setPercentage(100);
}

/**
* Adjusts the vertical position of the mana bar relative to the canvas.
* @param {HTMLCanvasElement} canvas - The canvas element to base the position on
*/
adjustPosition(canvas) {
  this.y = Math.max(5, canvas.height * 0.02) + 18;
}

/**
* Updates the mana bar's percentage and corresponding image.
* @param {number} percentage - New mana percentage (0-100)
*/
setPercentage(percentage) {
  this.percentage = percentage;
  const imageIndex = this.resolveImageIndex();
  this.img = this.imageCache[this.IMAGES[imageIndex]];
}

/**
* Determines the index of the image to use based on the current mana percentage.
* @returns {number} Image index for the current mana percentage
*/
resolveImageIndex() {
  if (this.percentage === 100) return 4;
  if (this.percentage >= 75) return 3;
  if (this.percentage >= 50) return 2;
  if (this.percentage >= 25) return 1;
  return 0;
}
}