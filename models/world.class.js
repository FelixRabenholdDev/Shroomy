class World {
  character = new Character();
  level = level1;

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

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);

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

    // this.ctx.beginPath();
    // this.ctx.rect(moObj.x, moObj.y, moObj.x + moObj.width, moObj.y + moObj.height);
    // this.ctx.lineWidth = 10;
    // this.ctx.strokeStyle = 'blue';
    // this.ctx.stroke();

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
