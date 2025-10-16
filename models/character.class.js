class Character extends MovableObject {

  speed = 1.1;

  offset = {
    top: 20,
    bottom: 20,
    left: 35,
    right: 35,
  };
  
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
    '../assets/img/2BlueWizardIdle/Chara - BlueIdle00019.png',
  ];

  Walking_Images = [
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00000.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00001.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00002.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00003.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00004.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00005.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00006.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00007.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00008.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00009.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00010.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00011.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00012.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00013.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00014.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00015.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00016.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00017.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00018.png',
    '../assets/img/2BlueWizardWalk/Chara_BlueWalk00019.png',
  ];

  Jumping_Images = [
    '../assets/img/2BlueWizardJump/CharaWizardJump_00000.png',
    '../assets/img/2BlueWizardJump/CharaWizardJump_00001.png',
    '../assets/img/2BlueWizardJump/CharaWizardJump_00002.png',
    '../assets/img/2BlueWizardJump/CharaWizardJump_00003.png',
    '../assets/img/2BlueWizardJump/CharaWizardJump_00004.png',
    '../assets/img/2BlueWizardJump/CharaWizardJump_00005.png',
    '../assets/img/2BlueWizardJump/CharaWizardJump_00006.png',
    '../assets/img/2BlueWizardJump/CharaWizardJump_00007.png',
  ];

  constructor() {
    super().loadImage('../assets/img/2BlueWizardIdle/Chara - BlueIdle00000.png',);
    this.loadImages(this.Idle_Images);
    this.loadImages(this.Walking_Images);
    this.loadImages(this.Jumping_Images);
    this.applyGravity()
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT && this.x > -500) {
        this.moveLeft();
        this.otherDirection = true;
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.Jumping_Images);
      }
    }, 150);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.Walking_Images);    
      }
    }, 100);

    setInterval(() => {
      if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround()) {
        this.playAnimation(this.Idle_Images);
      }
    }, 150);
  }

  
}
