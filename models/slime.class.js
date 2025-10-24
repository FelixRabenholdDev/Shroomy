class Slime extends MovableObject {

  offset = {
    top: 7,
    bottom: 7,
    left: 7,
    right: 7,
  };

  isSquashed = false;

    Walking_Images = [
    '../assets/img/SlimeGreen/SlimeBasic_00000.png',
    '../assets/img/SlimeGreen/SlimeBasic_00001.png',
    '../assets/img/SlimeGreen/SlimeBasic_00002.png',
    '../assets/img/SlimeGreen/SlimeBasic_00003.png',
    '../assets/img/SlimeGreen/SlimeBasic_00004.png',
    '../assets/img/SlimeGreen/SlimeBasic_00005.png',
    '../assets/img/SlimeGreen/SlimeBasic_00006.png',
    '../assets/img/SlimeGreen/SlimeBasic_00007.png',
    '../assets/img/SlimeGreen/SlimeBasic_00008.png',
    '../assets/img/SlimeGreen/SlimeBasic_00009.png',
    '../assets/img/SlimeGreen/SlimeBasic_00010.png',
    '../assets/img/SlimeGreen/SlimeBasic_00011.png',
    '../assets/img/SlimeGreen/SlimeBasic_00012.png',
    '../assets/img/SlimeGreen/SlimeBasic_00013.png',
    '../assets/img/SlimeGreen/SlimeBasic_00014.png',
    '../assets/img/SlimeGreen/SlimeBasic_00015.png',
    '../assets/img/SlimeGreen/SlimeBasic_00016.png',
    '../assets/img/SlimeGreen/SlimeBasic_00017.png',
    '../assets/img/SlimeGreen/SlimeBasic_00018.png',
    '../assets/img/SlimeGreen/SlimeBasic_00019.png',
    '../assets/img/SlimeGreen/SlimeBasic_00020.png',
    '../assets/img/SlimeGreen/SlimeBasic_00021.png',
    '../assets/img/SlimeGreen/SlimeBasic_00022.png',
    '../assets/img/SlimeGreen/SlimeBasic_00023.png',
    '../assets/img/SlimeGreen/SlimeBasic_00024.png',
    '../assets/img/SlimeGreen/SlimeBasic_00025.png',
    '../assets/img/SlimeGreen/SlimeBasic_00026.png',
    '../assets/img/SlimeGreen/SlimeBasic_00027.png',
    '../assets/img/SlimeGreen/SlimeBasic_00028.png',
    '../assets/img/SlimeGreen/SlimeBasic_00029.png'
  ];

  constructor() {
    super().loadImage('../assets/img/SlimeGreen/SlimeBasic_00000.png');
    this.loadImages(this.Walking_Images);

    this.x = 200 + Math.random() * 500;
    this.width = 45;
    this.height = 45;
    this.y = 290;
    this.speed = 0.15 + Math.random() * 0.35;
    this.currentImage = Math.floor(Math.random() * this.Walking_Images.length);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    
    setInterval(() => {
      this.playAnimation(this.Walking_Images);
    }, 100);
  }

squash() {
  if (this.isSquashed) return;
  this.isSquashed = true;
  this.height = this.height / 2;
  this.y += this.height / 2;

  setTimeout(() => {
    this.markedForDeletion = true;
  }, 100);
}

}
