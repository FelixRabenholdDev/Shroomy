class SoundManager {
  constructor() {
    this.sounds = {
      jump: new Audio('assets/audio/jump.wav'),
      shoot: new Audio('assets/audio/shoot.m4a'),
      collect: new Audio('assets/audio/collect.wav'),
      slimeHit: new Audio('assets/audio/slime_hit.wav'),
      slimeJump: new Audio('assets/audio/slime_jump.wav'),
    };

    this.backgroundMusic = new Audio('assets/audio/background.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.4;

    this.sounds.jump.volume = 0.4;
    this.sounds.shoot.volume = 0.5;
    this.sounds.collect.volume = 0.5;
    this.sounds.slimeHit.volume = 0.6;
    this.sounds.slimeJump.volume = 0.5;
  }

  play(name) {
    const sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  startMusic() {
    this.backgroundMusic.currentTime = 0;
    this.backgroundMusic.play();
  }

  stopMusic() {
    this.backgroundMusic.pause();
  }
}
