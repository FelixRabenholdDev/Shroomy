class Endboss extends MovableObject {

    y = 175;
    height = 200;
    width = 200;    
    Walking_Images = [
    '../assets/img/SlimeOrange/SlimeOrange_00000.png',
    '../assets/img/SlimeOrange/SlimeOrange_00001.png',
    '../assets/img/SlimeOrange/SlimeOrange_00002.png',
    '../assets/img/SlimeOrange/SlimeOrange_00003.png',
    '../assets/img/SlimeOrange/SlimeOrange_00004.png',
    '../assets/img/SlimeOrange/SlimeOrange_00005.png',
    '../assets/img/SlimeOrange/SlimeOrange_00006.png',
    '../assets/img/SlimeOrange/SlimeOrange_00007.png',
    '../assets/img/SlimeOrange/SlimeOrange_00008.png',
    '../assets/img/SlimeOrange/SlimeOrange_00009.png',
    '../assets/img/SlimeOrange/SlimeOrange_00010.png',
    '../assets/img/SlimeOrange/SlimeOrange_00011.png',
    '../assets/img/SlimeOrange/SlimeOrange_00012.png',
    '../assets/img/SlimeOrange/SlimeOrange_00013.png',
    '../assets/img/SlimeOrange/SlimeOrange_00014.png',
    '../assets/img/SlimeOrange/SlimeOrange_00015.png',
    '../assets/img/SlimeOrange/SlimeOrange_00016.png',
    '../assets/img/SlimeOrange/SlimeOrange_00017.png',
    '../assets/img/SlimeOrange/SlimeOrange_00018.png',
    '../assets/img/SlimeOrange/SlimeOrange_00019.png',
    '../assets/img/SlimeOrange/SlimeOrange_00020.png',
    '../assets/img/SlimeOrange/SlimeOrange_00021.png',
    '../assets/img/SlimeOrange/SlimeOrange_00022.png',
    '../assets/img/SlimeOrange/SlimeOrange_00023.png',
    '../assets/img/SlimeOrange/SlimeOrange_00024.png',
    '../assets/img/SlimeOrange/SlimeOrange_00025.png',
    '../assets/img/SlimeOrange/SlimeOrange_00026.png',
    '../assets/img/SlimeOrange/SlimeOrange_00027.png',
    '../assets/img/SlimeOrange/SlimeOrange_00028.png',
    '../assets/img/SlimeOrange/SlimeOrange_00029.png'
  ];

    constructor() {
        super().loadImage('../assets/img/SlimeOrange/SlimeOrange_00000.png');
        this.loadImages(this.Walking_Images);

        this.x = 700 + Math.random() * 500;
        this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.Walking_Images);
    }, 100);
  }
}