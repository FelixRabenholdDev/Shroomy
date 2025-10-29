class HPStatusBar extends DrawableObject {
  IMAGES = [
    './assets/img/UIBars/Blue00.png',
    './assets/img/UIBars/Blue25.png',
    './assets/img/UIBars/Blue50.png',
    './assets/img/UIBars/Blue75.png',
    './assets/img/UIBars/Blue100.png',
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.width = 170;
    this.height = 20;
    this.setPercentage(100);
  }

  adjustPosition(canvas) {
    this.y = Math.max(10, canvas.height * 0.02);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    const imageIndex = this.resolveImageIndex();
    this.img = this.imageCache[this.IMAGES[imageIndex]];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 4;
    } else if (this.percentage >= 75) {
      return 3;
    } else if (this.percentage >= 50) {
      return 2;
    } else if (this.percentage >= 25) {
      return 1;
    } else {
      return 0;
    }
  }
}
