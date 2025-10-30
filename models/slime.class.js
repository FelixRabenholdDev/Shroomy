class Slime extends MovableObject {

  jumpInterval;

  offset = {
    top: 7,
    bottom: 7,
    left: 7,
    right: 7,
  };

  isSquashed = false;
  isJumping = false;

  Walking_Images = [
    'assets/img/SlimeGreen/SlimeBasic_00000.png',
    'assets/img/SlimeGreen/SlimeBasic_00001.png',
    'assets/img/SlimeGreen/SlimeBasic_00002.png',
    'assets/img/SlimeGreen/SlimeBasic_00003.png',
    'assets/img/SlimeGreen/SlimeBasic_00004.png',
    'assets/img/SlimeGreen/SlimeBasic_00005.png',
    'assets/img/SlimeGreen/SlimeBasic_00006.png',
    'assets/img/SlimeGreen/SlimeBasic_00007.png',
    'assets/img/SlimeGreen/SlimeBasic_00008.png',
    'assets/img/SlimeGreen/SlimeBasic_00009.png',
    'assets/img/SlimeGreen/SlimeBasic_00010.png',
    'assets/img/SlimeGreen/SlimeBasic_00011.png',
    'assets/img/SlimeGreen/SlimeBasic_00012.png',
    'assets/img/SlimeGreen/SlimeBasic_00013.png',
    'assets/img/SlimeGreen/SlimeBasic_00014.png',
    'assets/img/SlimeGreen/SlimeBasic_00015.png',
    'assets/img/SlimeGreen/SlimeBasic_00016.png',
    'assets/img/SlimeGreen/SlimeBasic_00017.png',
    'assets/img/SlimeGreen/SlimeBasic_00018.png',
    'assets/img/SlimeGreen/SlimeBasic_00019.png',
    'assets/img/SlimeGreen/SlimeBasic_00020.png',
    'assets/img/SlimeGreen/SlimeBasic_00021.png',
    'assets/img/SlimeGreen/SlimeBasic_00022.png',
    'assets/img/SlimeGreen/SlimeBasic_00023.png',
    'assets/img/SlimeGreen/SlimeBasic_00024.png',
    'assets/img/SlimeGreen/SlimeBasic_00025.png',
    'assets/img/SlimeGreen/SlimeBasic_00026.png',
    'assets/img/SlimeGreen/SlimeBasic_00027.png',
    'assets/img/SlimeGreen/SlimeBasic_00028.png',
    'assets/img/SlimeGreen/SlimeBasic_00029.png',
  ];

  constructor() {
    super().loadImage('assets/img/SlimeGreen/SlimeBasic_00000.png');
    this.loadImages(this.Walking_Images);

    this.x = 250 + Math.random() * 1500;
    this.width = 45;
    this.height = 45;
    this.y = 290;
    this.groundLevel = this.y;
    this.speed = 0.15 + Math.random() * 0.35;
    this.currentImage = Math.floor(Math.random() * this.Walking_Images.length);
    this.applyGravity();
    this.animate();
    this.enableRandomJumping();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.Walking_Images);
    }, 100);
  }

  enableRandomJumping() {
    this.jumpInterval = setInterval(() => {
      if (!this.isAboveGround() && !this.isJumping) {
        if (Math.random() < 0.0125) {
          this.jump();
          this.isJumping = true;
        }
      }

      if (!this.isAboveGround()) {
        this.isJumping = false;
      }
    }, 150);
  }

  jump() {
    this.speedY = 4 + Math.random() * 5;
    if (this.world && this.world.soundManager) {
      this.world.soundManager.play('slimeJump');
    }
  }

  squash() {
    if (this.isSquashed) return;
    this.isSquashed = true;
    this.height = this.height / 2;
    this.y += this.height / 2;

    clearInterval(this.animInterval);

    setTimeout(() => {
      this.markedForDeletion = true;
    }, 100);
  }
}
