class ManaStatusBar extends DrawableObject {

    IMAGES = [
        './assets/img/UIBars/Green00.png',
        './assets/img/UIBars/Green25.png',
        './assets/img/UIBars/Green50.png',
        './assets/img/UIBars/Green75.png',
        './assets/img/UIBars/Green100.png'
    ];

    percentage = 100;    

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 20;
        this.width = 150;
        this.height = 30;
        this.setPercentage(100);
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