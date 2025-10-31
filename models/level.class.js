/**
 * Represents a game level containing enemies, background objects, and collectable objects.
 *
 * @class Level
 */
class Level {
  /** @type {Array<MovableObject>} The enemies present in this level */
  enemies;

  /** @type {Array<DrawableObject>} Background objects in the level */
  backgroundObjects;

  /** @type {Array<CollectableObject>} Collectable objects in the level */
  collectableObjects;

  /** @type {number} The x-coordinate marking the end of the level */
  level_end_x = 719 * 3 - 100; // Adjusted for camera_x

  /**
   * Creates a new Level instance.
   * @param {Array<MovableObject>} enemies - Array of enemies in the level
   * @param {Array<DrawableObject>} backgroundObjects - Array of background objects
   * @param {Array<CollectableObject>} collectableObjects - Array of collectable objects
   */
  constructor(enemies, backgroundObjects, collectableObjects) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.collectableObjects = collectableObjects;
  }
}
