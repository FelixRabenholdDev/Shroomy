/**
 * Represents the main player character.
 * Handles movement, animations, collisions, and interactions with the game world.
 *
 * @class Character
 * @extends MovableObject
 */
class Character extends MovableObject {
  /**
   * Movement speed of the character.
   * @type {number}
   * @default 1.1
   */
  speed = 1.1;

  /**
   * The vertical speed during the last frame.
   * @type {number}
   */
  lastSpeedY = 0;

  /**
   * Collision offset for top, bottom, left, and right sides.
   * @type {{top: number, bottom: number, left: number, right: number}}
   */
  offset = {
    top: 27,
    bottom: 27,
    left: 38,
    right: 39,
  };

  /**
   * Array of image paths for idle animation.
   * @type {string[]}
   */
  Idle_Images = [
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00000.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00001.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00002.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00003.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00004.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00005.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00006.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00007.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00008.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00009.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00010.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00011.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00012.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00013.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00014.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00015.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00016.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00017.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00018.png',
    'assets/img/2BlueWizardIdle/Chara - BlueIdle00019.png',
  ];

  /**
   * Array of image paths for walking animation.
   * @type {string[]}
   */
  Walking_Images = [
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00000.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00001.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00002.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00003.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00004.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00005.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00006.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00007.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00008.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00009.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00010.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00011.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00012.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00013.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00014.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00015.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00016.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00017.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00018.png',
    'assets/img/2BlueWizardWalk/Chara_BlueWalk00019.png',
  ];

  /**
   * Array of image paths for jumping animation.
   * @type {string[]}
   */
  Jumping_Images = [
    'assets/img/2BlueWizardJump/CharaWizardJump_00000.png',
    'assets/img/2BlueWizardJump/CharaWizardJump_00001.png',
    'assets/img/2BlueWizardJump/CharaWizardJump_00002.png',
    'assets/img/2BlueWizardJump/CharaWizardJump_00003.png',
    'assets/img/2BlueWizardJump/CharaWizardJump_00004.png',
    'assets/img/2BlueWizardJump/CharaWizardJump_00005.png',
    'assets/img/2BlueWizardJump/CharaWizardJump_00006.png',
    'assets/img/2BlueWizardJump/CharaWizardJump_00007.png',    
  ];

  /**
   * Array of image paths for hurt animation.
   * @type {string[]}
   */
  Hurting_Images = [
    'assets/img/2BlueWizardJump/Dash2/DashBlue_00002.png',
    'assets/img/2BlueWizardJump/Dash2/DashBlue_00003.png',
    'assets/img/2BlueWizardJump/Dash2/DashBlue_00004.png',
    'assets/img/2BlueWizardJump/Dash2/DashBlue_00005.png',
    'assets/img/2BlueWizardJump/Dash2/DashBlue_00006.png',
    'assets/img/2BlueWizardJump/Dash2/DashBlue_00007.png',
    
  ];

  /**
   * Array of image paths for dying animation.
   * @type {string[]}
   */
  Dying_Images = [
    'assets/img/2BlueWizardJump/Dash2/DashBlue_00002.png',
    'assets/img/2BlueWizardJump/Dash2/DashBlue_00003.png',
    'assets/img/2BlueWizardJump/Dash2/DashBlue_00004.png',
    'assets/img/2BlueWizardJump/Dash2/DashBlue_00005.png',
    'assets/img/2BlueWizardJump/Dash2/DashBlue_00006.png',
    'assets/img/2BlueWizardJump/Dash2/DashBlue_00007.png',
  ];

  /**
   * Initializes the character with images and gravity.
   */
  constructor() {
    super().loadImage('assets/img/2BlueWizardIdle/Chara - BlueIdle00000.png');
    this.loadImages(this.Idle_Images);
    this.loadImages(this.Walking_Images);
    this.loadImages(this.Jumping_Images);
    this.loadImages(this.Hurting_Images);
    this.loadImages(this.Dying_Images);
    this.applyGravity();
  }

  /**
   * Animates the character based on movement, jumping, and health state.
   * Handles keyboard input and camera movement.
   */
  animate() {
    setInterval(() => {
      // Movement controls
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

      // Walking sound
      if (!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
        this.world.soundManager.startLoop('walk', 0.5 + this.speed / 10);
      } else {
        this.world.soundManager.stopLoop('walk');
      }
    }, 1000 / 60);

    setInterval(() => {
      // Animation frames
      if (this.isDead()) {
        this.playAnimation(this.Dying_Images);
      } else if (this.isHurt()) {
        this.playAnimation(this.Hurting_Images);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.Jumping_Images);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.Walking_Images);
      } else {
        this.playAnimation(this.Idle_Images);
      }
    }, 100);
  }

  /**
   * Makes the character bounce upwards, e.g., after stomping on an enemy.
   */
  bounce() {
    this.speedY = 5;
  }
}
