class World {
  character = new Character();
  level = level1;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusbar = new HPStatusBar();
  manaStatusBar = new ManaStatusBar();
  throwableObjects = [];
  lastThrowTime = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.drawWorld();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
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
      Date.now() - this.lastThrowTime > 500 &&
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
        }
      });
    });

    this.throwableObjects = this.throwableObjects.filter(
      (o) => !o.markedForDeletion,
    );

    for (let i = this.level.enemies.length - 1; i >= 0; i--) {
      const enemy = this.level.enemies[i];
      if (enemy.markedForDeletion) {
        this.level.enemies.splice(i, 1);
      }
    }
  }

  checkCollectableCollisions() {
    this.level.collectableObjects.forEach((collectable) => {
      if (!collectable.collected && this.character.isColliding(collectable)) {
        collectable.collected = true;

        if (this.character.mana <= 75) {
          this.character.mana += 25;
          this.manaStatusBar.setPercentage(this.character.mana);
          collectable.markedForDeletion = true;
        } else {
          this.character.mana = 100;
          this.manaStatusBar.setPercentage(this.character.mana);
        }
      }
    });

    this.level.collectableObjects = this.level.collectableObjects.filter(
      (c) => !c.markedForDeletion,
    );
  }

  drawWorld() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0); // camera movement

    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    // Space for Fixed Objects
    this.addToMap(this.statusbar);
    this.addToMap(this.manaStatusBar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.collectableObjects);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0); // camera movement

    this.checkCollisions();
    this.checkThrowObjects();
    this.checkThrowableCollisions();
    this.checkCollectableCollisions();

    // Draw() triggers over and over again
    let self = this;
    requestAnimationFrame(function () {
      self.drawWorld();
    });
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
    moObj.drawFrame(this.ctx);

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
  cancelAnimationFrame(this.animationFrame);
  showEndScreen();
  }
}
