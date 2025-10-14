class World {
  character = new Character();

  enemies = level1.enemies;
  backgroundObjects = level1.backgroundObjects;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0); // camera movement

    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);

    this.ctx.translate(-this.camera_x, 0); // camera movement

    // Draw() triggers over and over again
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
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
    this.ctx.drawImage(moObj.img, moObj.x, moObj.y, moObj.width, moObj.height);
    if (moObj.otherDirection) {
      moObj.x = moObj.x * -1;
      this.ctx.restore();
    }
  }

  flipImage(moObj) {
      this.ctx.save();
      this.ctx.translate(moObj.width, 0);
      this.ctx.scale(-1, 1);
      moObj.x = moObj.x * -1;
  }
}
