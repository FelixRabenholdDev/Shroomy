/**
 * @typedef {Object} DrawableObject
 * @property {number} x - The x position of the object.
 * @property {number} y - The y position of the object.
 * @property {number} width - The width of the object.
 * @property {number} height - The height of the object.
 * @property {boolean} [otherDirection] - Indicates if the object is facing the opposite direction.
 * @property {function(CanvasRenderingContext2D, number):void} draw - Draws the object to the canvas.
 */

/**
 * @typedef {Object} Enemy
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {boolean} [isEndboss]
 * @property {boolean} [isSquashed]
 * @property {boolean} [markedForDeletion]
 * @property {function():void} squash
 * @property {function(number):void} [takeHit]
 * @property {function():void} [pauseMovement]
 * @property {number} [energy]
 * @property {number} [jumpInterval]
 * @property {boolean} [otherDirection]
 */

/**
 * @typedef {Object} CollectableObject
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {boolean} [collected]
 * @property {boolean} [markedForDeletion]
 * @property {function(CanvasRenderingContext2D, number):void} draw
 */

/**
 * @typedef {Object} Level
 * @property {Enemy[]} enemies - Enemies in the level.
 * @property {DrawableObject[]} backgroundObjects - Background layers.
 * @property {CollectableObject[]} collectableObjects - Collectable items in the level.
 */

/**
 * @typedef {Object} Keyboard
 * @property {boolean} [D] - Indicates if the throw key is pressed.
 */

/**
 * @typedef {Object} SoundManager
 * @property {function():void} startMusic
 * @property {function():void} stopMusic
 * @property {function(string):void} stopLoop
 * @property {function(string):void} play
 */

/**
 * @typedef {Object} ThrowableObject
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {boolean} [markedForDeletion]
 * @property {function(Enemy):boolean} isColliding
 * @property {function(CanvasRenderingContext2D, number):void} draw
 */

/**
 * The World class represents the game world and manages
 * the character, level, rendering, and interactions.
 *
 * @class
 */
class World {
  /**
   * @type {Character}
   */
  character = new Character();

  /**
   * @type {Level}
   */
  level;

  /**
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * @type {CanvasRenderingContext2D}
   */
  ctx;

  /**
   * @type {Keyboard}
   */
  keyboard;

  /**
   * @type {SoundManager}
   */
  soundManager;

  /**
   * @type {number}
   */
  camera_x = 0;

  /**
   * @type {HPStatusBar}
   */
  statusbar = new HPStatusBar();

  /**
   * @type {ManaStatusBar}
   */
  manaStatusBar = new ManaStatusBar();

  /**
   * @type {EndbossStatusBar}
   */
  endbossStatusBar = new EndbossStatusBar();

  /**
   * @type {ThrowableObject[]}
   */
  throwableObjects = [];

  /**
   * @type {number}
   */
  lastThrowTime = 0;

  /**
   * @type {boolean}
   */
  isPaused = true;

  /**
   * @type {number | null}
   */
  animationFrame;

  /**
   * Creates a new game world instance.
   *
   * @constructor
   * @param {HTMLCanvasElement} canvas - The canvas used for rendering.
   * @param {Keyboard} keyboard - The keyboard input manager.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.soundManager = soundManager;
    this.reset();
  }

  /**
   * Links the world reference to all entities (character, enemies, collectables).
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => (enemy.world = this));
    this.level.collectableObjects.forEach((obj) => (obj.world = this));
  }

  /**
   * Starts or resumes the game and background music.
   */
  start() {
    if (!this.isPaused) return;
    this.isPaused = false;
    this.soundManager.startMusic();
    this.drawWorld();
  }

  /**
   * Pauses the game and stops sound loops.
   */
  pause() {
    this.isPaused = true;
    this.soundManager.stopLoop('walk');
    this.soundManager.stopMusic();
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  /**
   * Resets the game state, reinitializes level and UI components.
   */
  reset() {
    this.pause();
    this.character = new Character();
    this.level = createLevel1();
    this.camera_x = 0;
    this.statusbar = new HPStatusBar();
    this.manaStatusBar = new ManaStatusBar();
    this.throwableObjects = [];
    this.lastThrowTime = 0;
    this.setWorld();
    this.character.animate();
  }

  /**
   * Checks collisions between the player and enemies.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        const charBottom = this.character.y + this.character.height;
        const enemyTop = enemy.y;
        const overlap = charBottom - enemyTop;
        const comingFromAbove =
          overlap > 0 &&
          overlap < this.character.height * 0.6 &&
          this.character.y < enemy.y &&
          (this.character.speedY <= 0 || this.character.lastSpeedY < 0);

        if (comingFromAbove && !(enemy instanceof Endboss)) {
          enemy.squash();
          this.soundManager.play('slimeHit');
          this.character.bounce();
        } else if (!this.character.isHurt() && !enemy.isSquashed) {
          this.character.handleCollision();
          this.statusbar.setPercentage(this.character.energy);
          if (enemy.isEndboss && typeof enemy.pauseMovement === 'function') {
            enemy.pauseMovement();
          }
        }
        this.character.lastSpeedY = this.character.speedY;
      }
    });
  }

  /**
   * Checks if a throwable object can be launched.
   */
  checkThrowObjects() {
    if (
      this.keyboard.D &&
      Date.now() - this.lastThrowTime > 1250 &&
      this.character.mana > 0
    ) {
      if (!this.character.otherDirection) {
        const throwableObject = new ThrowableObject(
          this.character.x + 60,
          this.character.y + 40,
        );
        this.throwableObjects.push(throwableObject);
        this.character.handleMana();
        this.manaStatusBar.setPercentage(this.character.mana);
        this.lastThrowTime = Date.now();
        this.soundManager.play('shoot');
      }
    }
  }

  /**
   * Checks for collisions between throwable objects and enemies.
   */
  checkThrowableCollisions() {
    this.throwableObjects.forEach((throwable) => {
      this.level.enemies.forEach((enemy) => {
        if (throwable.isColliding(enemy)) {
          if (enemy.isEndboss) {
            enemy.takeHit(25);
          } else {
            enemy.markedForDeletion = true;
          }
          throwable.markedForDeletion = true;
          this.soundManager.play('slimeHit');
        }
      });
    });

    this.throwableObjects = this.throwableObjects.filter(
      (object) => !object.markedForDeletion,
    );
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (enemy.markedForDeletion) {
        clearInterval(enemy.jumpInterval);
        return false;
      }
      return true;
    });
  }

  /**
   * Checks if the character collects any collectible objects.
   */
  checkCollectableCollisions() {
    this.level.collectableObjects.forEach((collectable) => {
      if (!collectable.collected && this.character.isColliding(collectable)) {
        if (this.character.mana <= 75) {
          collectable.collected = true;
          this.character.mana += 25;
          collectable.markedForDeletion = true;
          this.soundManager.play('collect');
        } else {
          this.character.mana = 100;
        }
        this.manaStatusBar.setPercentage(this.character.mana);
      }
    });
    this.level.collectableObjects = this.level.collectableObjects.filter(
      (c) => !c.markedForDeletion,
    );
  }

  /**
   * Draws and updates the game world each frame.
   */
  drawWorld() {
    if (this.isPaused) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.collectableObjects);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.restore();

    this.statusbar.adjustPosition(this.canvas);
    this.manaStatusBar.adjustPosition(this.canvas);
    this.addToMap(this.statusbar);
    this.addToMap(this.manaStatusBar);

    const endboss = this.level.enemies.find((enemy) => enemy.isEndboss);
    if (endboss && this.isOnScreen(endboss)) {
      this.endbossStatusBar.adjustPosition(this.canvas);
      this.endbossStatusBar.setPercentage(endboss.energy);
      this.addToMap(this.endbossStatusBar);
    }
    this.checkCollisions();
    this.checkThrowObjects();
    this.checkThrowableCollisions();
    this.checkCollectableCollisions();
    this.animationFrame = requestAnimationFrame(() => this.drawWorld());
  }

  /**
   * Adds multiple drawable objects to the map.
   *
   * @param {DrawableObject[]} objects - The array of objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((tile) => this.addToMap(tile));
  }

  /**
   * Adds a single object to the map and handles image flipping.
   *
   * @param {DrawableObject} moObj - The object to draw.
   */
  addToMap(moObj) {
    const x = Math.round(moObj.x);
    if (moObj.otherDirection) this.flipImage(moObj, x);
    moObj.draw(this.ctx, x);
    if (moObj.otherDirection) this.flipImageBack(moObj, x);
  }

  /**
   * Flips the drawing context horizontally for mirrored objects.
   *
   * @param {DrawableObject} moObj - The object to flip.
   */
  flipImage(moObj) {
    this.ctx.save();
    this.ctx.translate(moObj.width, 0);
    this.ctx.scale(-1, 1);
    moObj.x = moObj.x * -1;
  }

  /**
   * Restores context after flipping an image horizontally.
   *
   * @param {DrawableObject} moObj - The flipped object.
   */
  flipImageBack(moObj) {
    moObj.x = moObj.x * -1;
    this.ctx.restore();
  }

  /**
   * Ends the game and shows the end screen.
   */
  gameOver() {
    this.pause();
    showEndScreen();
  }

  /**
   * Checks if an object is currently visible within the camera view.
   *
   * @param {DrawableObject} obj - The object to check.
   * @returns {boolean} True if the object is visible on screen.
   */
  isOnScreen(obj) {
    const screenLeft = -this.camera_x;
    const screenRight = -this.camera_x + this.canvas.width;
    return obj.x + obj.width > screenLeft && obj.x < screenRight;
  }
}
