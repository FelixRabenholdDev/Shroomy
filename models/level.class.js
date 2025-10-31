/**
 * Level class represents a game level with its enemies, background objects, and collectable objects.
 * @class
 */

class Level {
    enemies;
    backgroundObjects;
    collectableObjects;
    level_end_x = 719 * 3 - 100; // -100 because of camera_x

    constructor(enemies, backgroundObjects, collectableObjects) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects;
    }
}