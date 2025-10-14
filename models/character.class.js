class Character extends MovableObject {
  Idle_Images = [
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00000.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00001.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00002.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00003.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00004.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00005.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00006.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00007.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00008.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00009.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00010.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00011.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00012.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00013.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00014.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00015.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00016.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00017.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00018.png',
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00019.png'
  ];

  Walk_Images = [
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00000.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00001.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00002.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00003.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00004.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00005.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00006.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00007.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00008.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00009.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00010.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00011.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00012.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00013.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00014.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00015.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00016.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00017.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00018.png',
    '../assets/img/2BlueWizardWalk/Chara - BlueWalk00019.png'
  ];

  constructor() {
    super().loadImage(
      '../assets/img/2BlueWizardIdle/Chara - BlueIdle00000.png',
    );
    this.loadImages(this.Idle_Images);

    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.Idle_Images.length;
      let path = this.Idle_Images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 150);
  }

  jump() {}
}
