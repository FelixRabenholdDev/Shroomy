/**
 * Represents a health points (HP) status bar in the game.
 *
 * @class HPStatusBar
 * @extends DrawableObject
 */
class HPStatusBar extends DrawableObject {
  /** @type {string[]} Array of image paths representing different HP levels */
  IMAGES = [
    'assets/img/UIBars/Blue00.png',
    'assets/img/UIBars/Blue25.png',
    'assets/img/UIBars/Blue50.png',
    'assets/img/UIBars/Blue75.png',
    'assets/img/UIBars/Blue100.png',
  ];

  /** @type {number} Current HP percentage (0-100) */
  percentage = 100;

  /**
   * Creates an HPStatusBar instance, loads images, and sets initial position and size.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.width = 170;
    this.height = 20;
    this.setPercentage(100);
  }

  /**
   * Adjusts the vertical position of the status bar based on the canvas size.
   * @param {HTMLCanvasElement} canvas The canvas element
   */
  adjustPosition(canvas) {
    this.y = Math.max(10, canvas.height * 0.02);
  }

  /**
   * Sets the current HP percentage and updates the displayed image.
   * @param {number} percentage The new HP percentage (0-100)
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    const imageIndex = this.resolveImageIndex();
    this.img = this.imageCache[this.IMAGES[imageIndex]];
  }

  /**
   * Determines which image index to use based on the current HP percentage.
   * @returns {number} Index of the image in IMAGES array
   */
  resolveImageIndex() {
    if (this.percentage === 100) return 4;
    if (this.percentage >= 75) return 3;
    if (this.percentage >= 50) return 2;
    if (this.percentage >= 25) return 1;
    return 0;
  }
}
