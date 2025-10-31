/**
 * Represents a collectable mana object in the game.
 * Handles animation and collection state.
 *
 * @class CollectableObject
 * @extends MovableObject
 */
class CollectableObject extends MovableObject {
  /**
   * Indicates whether the mana object has been collected.
   * @type {boolean}
   * @default false
   */
  collected = false;

  /**
   * Array of image paths used for the mana object's animation.
   * @type {string[]}
   */
  Mana_Images = [
    'assets/img/CollectableMana/Mana1.png',
    'assets/img/CollectableMana/Mana2.png',
    'assets/img/CollectableMana/Mana3.png',
    'assets/img/CollectableMana/Mana4.png',
  ];

  /**
   * Creates a CollectableObject at a random position within specified ranges.
   *
   * @param {number} x - Initial x position (not used directly here, randomized instead).
   * @param {number} y - Initial y position (not used directly here, randomized instead).
   */
  constructor(x, y) {
    super();
    this.loadImage(this.Mana_Images[0]);
    this.loadImages(this.Mana_Images);
    this.x = 200 + Math.random() * 1500;
    this.y = 200 + Math.random() * 70;
    this.width = 20;
    this.height = 20;
    this.animateMana();
  }

  /**
   * Animates the mana object by cycling through the animation images at a fixed interval.
   */
  animateMana() {
    setInterval(() => {
      this.playAnimation(this.Mana_Images);
    }, 100);
  }
}
