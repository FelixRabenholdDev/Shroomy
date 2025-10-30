class World {
  character = new Character();
  level;
  soundManager = new SoundManager();

  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusbar = new HPStatusBar();
  manaStatusBar = new ManaStatusBar();
  endbossStatusBar = new EndbossStatusBar();
  throwableObjects = [];
  lastThrowTime = 0;
  isPaused = true;
  animationFrame;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.reset();
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => (enemy.world = this));
    this.level.collectableObjects.forEach((obj) => (obj.world = this));
  }

  start() {
    if (!this.isPaused) return;
    this.isPaused = false;
    this.soundManager.startMusic();
    this.drawWorld();
  }

  pause() {
    this.isPaused = true;
    this.soundManager.stopLoop('walk');
    this.soundManager.stopMusic();
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

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

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        const charBottom = this.character.y + this.character.height;
        const enemyTop = enemy.y;
        const overlap = charBottom - enemyTop;

        // character falls in enemy
        const comingFromAbove =
          overlap > 0 &&
          overlap < this.character.height * 0.6 &&
          this.character.y < enemy.y &&
          (this.character.speedY <= 0 || this.character.lastSpeedY < 0);

        if (comingFromAbove && !(enemy instanceof Endboss)) {
          // hit enemy from above
          enemy.squash();
          this.soundManager.play('slimeHit');
          this.character.bounce();
        } else if (!this.character.isHurt() && !enemy.isSquashed) {
          // hit by enemy
          this.character.handleCollision();
          this.statusbar.setPercentage(this.character.energy);
        }
        // save last vertical speed
        this.character.lastSpeedY = this.character.speedY;
      }
    });
  }

  checkThrowObjects() {
    if (
      this.keyboard.D &&
      Date.now() - this.lastThrowTime > 1250 &&
      this.character.mana > 0
    ) {
      let throwableObject = new ThrowableObject(
        this.character.x + 60,
        this.character.y + 40,
      );
      this.throwableObjects.push(throwableObject);
      this.character.handleMana();
      this.manaStatusBar.setPercentage(this.character.mana);
      this.lastThrowTime = new Date().getTime();
      this.soundManager.play('shoot');
    }
  }

  checkThrowableCollisions() {
    this.throwableObjects.forEach((throwable) => {
      this.level.enemies.forEach((enemy) => {
        if (throwable.isColliding(enemy)) {
          if (enemy.isEndboss) {
            enemy.takeHit(25);
            throwable.markedForDeletion = true;            
          } else {
            enemy.markedForDeletion = true;
            throwable.markedForDeletion = true;
          }
          this.soundManager.play('slimeHit');
        }
      });
    });

    this.throwableObjects = this.throwableObjects.filter(
      (object) => !object.markedForDeletion,
    );

    for (let i = this.level.enemies.length - 1; i >= 0; i--) {
      const enemy = this.level.enemies[i];
      if (enemy.markedForDeletion) {
        clearInterval(enemy.jumpInterval);
        this.level.enemies.splice(i, 1);
      }
    }
  }

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

  drawWorld() {
    if (this.isPaused) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0); // camera movement

    this.addObjectsToMap(this.level.backgroundObjects);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.collectableObjects);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);
    // Space for Fixed Objects
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

    // Draw() triggers over and over again

    this.animationFrame = requestAnimationFrame(() => this.drawWorld());
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(moObj) {
    if (moObj.otherDirection) {
      this.flipImage(moObj);
    }
    moObj.draw(this.ctx);

    if (moObj.otherDirection) {
      this.flipImageBack(moObj);
    }
  }

  flipImage(moObj) {
    this.ctx.save();
    this.ctx.translate(moObj.width, 0);
    this.ctx.scale(-1, 1);
    moObj.x = moObj.x * -1;
  }

  flipImageBack(moObj) {
    moObj.x = moObj.x * -1;
    this.ctx.restore();
  }

  gameOver() {
    this.pause();
    showEndScreen();
  }

  isOnScreen(obj) {
    const screenLeft = -this.camera_x;
    const screenRight = -this.camera_x + this.canvas.width;
    return obj.x + obj.width > screenLeft && obj.x < screenRight;
  }
}
