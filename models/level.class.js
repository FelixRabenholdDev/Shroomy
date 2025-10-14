class Level {
    enemies;
    backgroundObjects;
    level_end_x = 719 * 3 - 100; // -100 because of camera_x

    constructor(enemies, backgroundObjects) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
    }
}