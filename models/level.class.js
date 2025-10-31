/**
 * Represents a game level containing enemies, background objects, and collectable objects.
 *
 * @class Level
 */
class Level {
  /**
   * The enemies present in this level
   * @type {Array<MovableObject>}
   */
  enemies;

  /**
   * Background objects in the level
   * @type {Array<DrawableObject>}
   */
  backgroundObjects;

  /**
   * Collectable objects in the level
   * @type {Array<CollectableObject>}
   */
  collectableObjects;

  /**
   * The x-coordinate marking the end of the level
   * @type {number}
   */
  level_end_x = 719 * 3 - 100; // Adjusted for camera_x

  /**
   * Creates a new Level instance.
   * @param {Array<MovableObject>} enemies - Array of enemies in the level
   * @param {Array<DrawableObject>} backgroundObjects - Array of background objects
   * @param {Array<CollectableObject>} collectableObjects - Array of collectable objects
   */
  constructor(enemies, backgroundObjects, collectableObjects) {
    /** 
     * @type {Array<MovableObject>} 
     */
    this.enemies = enemies;

    /** 
     * @type {Array<DrawableObject>} 
     */
    this.backgroundObjects = backgroundObjects;

    /** 
     * @type {Array<CollectableObject>} 
     */
    this.collectableObjects = collectableObjects;
  }
}
