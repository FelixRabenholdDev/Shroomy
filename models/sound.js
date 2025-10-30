class SoundManager {
  rate = 1;
  isMuted = false;

  constructor() {
    this.sounds = {
      walk: new Audio('assets/audio/walk.wav'),
      jump: new Audio('assets/audio/jump.wav'),
      shoot: new Audio('assets/audio/shoot.m4a'),
      collect: new Audio('assets/audio/collect.wav'),
      slimeHit: new Audio('assets/audio/slime_hit.wav'),
      slimeJump: new Audio('assets/audio/slime_jump.wav'),
    };

    this.backgroundMusic = new Audio('assets/audio/background.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.2;

    this.sounds.walk.volume = 0.5;
    this.sounds.walk.loop = true;

    this.sounds.jump.volume = 0.4;
    this.sounds.shoot.volume = 0.4;
    this.sounds.collect.volume = 0.5;
    this.sounds.slimeHit.volume = 0.4;
    this.sounds.slimeJump.volume = 0.5;

    const savedMute = localStorage.getItem('mute');
    if (savedMute === 'true') this.mute();
  }

  play(name) {
    if (this.isMuted) return;
    const sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  startLoop(name, rate) {
    if (this.isMuted) return;
    const sound = this.sounds[name];
    if (sound && sound.paused) {
      sound.currentTime = 0;
      sound.playbackRate = rate;
      sound.play();
    }
  }

  stopLoop(name) {
    const sound = this.sounds[name];
    if (sound && !sound.paused) {
      sound.pause();
    }
  }

  startMusic() {
    if (this.isMuted) return;
    this.backgroundMusic.currentTime = 0;
    this.backgroundMusic.play();
  }

  stopMusic() {
    this.backgroundMusic.pause();
  }

  mute() {
    this.isMuted = true;
    this.backgroundMusic.pause();
    for (let key in this.sounds) {
      this.sounds[key].pause();
    }
    localStorage.setItem('mute', 'true');
  }

  unmute() {
    this.isMuted = false;
    this.backgroundMusic.play();
    localStorage.setItem('mute', 'false');
  }

  toggleMute() {
    if (this.isMuted) this.unmute();
    else this.mute();
  }
}
