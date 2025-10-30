class SoundManager {
  constructor() {
    this.sounds = {
      jump: new Audio('assets/audio/jump.mp3'),
      shoot: new Audio('assets/audio/shoot.mp3'),
      collect: new Audio('assets/audio/collect.mp3'),
      enemyHit: new Audio('assets/audio/enemy_hit.mp3'),
    };

    this.sounds.jump.volume = 0.4;
    this.sounds.shoot.volume = 0.5;
    this.sounds.collect.volume = 0.5;
    this.sounds.enemyHit.volume = 0.6;
  }

  play(name) {
    const sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }
}