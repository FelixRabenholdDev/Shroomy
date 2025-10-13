class Slime extends MovableObject {

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
    this.moveLeft();
    setInterval(() => {
      let i = this.currentImage % this.Walking_Images.length;
      let path = this.Walking_Images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 100);
  }
}
