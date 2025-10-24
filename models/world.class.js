class World {
  character = new Character();
  level = level1;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusbar = new StatusBar();
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

        // Prüfen, ob Charakter über Gegner war und leicht in ihn hineinfällt
        const comingFromAbove =
          overlap > 0 &&
          overlap < this.character.height * 0.6 &&
          this.character.y < enemy.y &&
          (this.character.speedY <= 0 || this.character.lastSpeedY < 0);

        if (comingFromAbove) {
          // === Treffer von oben ===
          enemy.squash();
          this.character.bounce();
        } else if (!this.character.isHurt() && !enemy.isSquashed) {
          // === seitlicher Treffer ===
          this.character.handleCollision();
          this.statusbar.setPercentage(this.character.energy);
        }
        // Letzten speedY für nächste Prüfung speichern
        this.character.lastSpeedY = this.character.speedY;
      }
    });
  }

  checkThrowObjects() {
    if (this.keyboard.D && Date.now() - this.lastThrowTime > 500) {
      let throwableObject = new ThrowableObject(
        this.character.x + 60,
        this.character.y + 40,
      );
      this.throwableObjects.push(throwableObject);
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

  drawWorld() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0); // camera movement

    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    // Space for Fixed Objects
    this.addToMap(this.statusbar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0); // camera movement

    this.checkCollisions();
    this.checkThrowObjects();
    this.checkThrowableCollisions();

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
}
