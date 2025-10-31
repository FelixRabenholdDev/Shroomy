/**
 * Handles all audio functionalities in the game, including sound effects and background music.
 *
 * @class SoundManager
 */
class SoundManager {
  /**
   * Playback rate for sounds
   * @type {number}
   */
  rate = 1;

  /**
   * Flag indicating if the audio is muted
   * @type {boolean}
   */
  isMuted = false;

  /**
   * Creates a new SoundManager instance and initializes all audio files and volumes.
   */
  constructor() {
    /**
     * Collection of sound effect objects
     * @type {Object.<string, HTMLAudioElement>}
     */
    this.sounds = {
      walk: new Audio('assets/audio/walk.wav'),
      jump: new Audio('assets/audio/jump.wav'),
      shoot: new Audio('assets/audio/shoot.m4a'),
      collect: new Audio('assets/audio/collect.wav'),
      slimeHit: new Audio('assets/audio/slime_hit.wav'),
      slimeJump: new Audio('assets/audio/slime_jump.wav'),
    };

    /**
     * Background music
     * @type {HTMLAudioElement}
     */
    this.backgroundMusic = new Audio('assets/audio/background.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.15;

    this.sounds.walk.volume = 0.5;
    this.sounds.walk.loop = true;

    this.sounds.jump.volume = 0.2;
    this.sounds.shoot.volume = 0.2;
    this.sounds.collect.volume = 0.2;
    this.sounds.slimeHit.volume = 0.2;
    this.sounds.slimeJump.volume = 0.2;

    const savedMute = localStorage.getItem('mute');
    if (savedMute === 'true') this.mute();
  }

  /**
   * Plays a one-time sound effect by name.
   * @param {string} name The name of the sound to play
   */
  play(name) {
    if (this.isMuted) return;
    const sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  /**
   * Starts looping a sound effect.
   * @param {string} name The name of the sound to loop
   * @param {number} rate Playback rate for the looped sound
   */
  startLoop(name, rate) {
    if (this.isMuted) return;
    const sound = this.sounds[name];
    if (sound && sound.paused) {
      sound.currentTime = 0;
      sound.playbackRate = rate;
      sound.play();
    }
  }

  /**
   * Stops a looping sound effect.
   * @param {string} name The name of the sound to stop
   */
  stopLoop(name) {
    const sound = this.sounds[name];
    if (sound && !sound.paused) {
      sound.pause();
    }
  }

  /** Starts the background music */
  startMusic() {
    if (this.isMuted) return;
    this.backgroundMusic.currentTime = 0;
    this.backgroundMusic.play();
  }

  /** Stops the background music */
  stopMusic() {
    this.backgroundMusic.pause();
  }

  /** Mutes all sounds and background music, saving the state to localStorage */
  mute() {
    this.isMuted = true;
    this.backgroundMusic.volume = 0;
    for (let key in this.sounds) {
      this.sounds[key].volume = 0;
    }
    this.backgroundMusic.pause();
    for (let key in this.sounds) {
      this.sounds[key].pause();
    }
    localStorage.setItem('mute', 'true');
  }

  /** Unmutes all sounds and background music, restoring their volumes */
  unmute() {
    this.isMuted = false;
    this.backgroundMusic.volume = 0.15;
    this.sounds.walk.volume = 0.5;
    this.sounds.jump.volume = 0.2;
    this.sounds.shoot.volume = 0.2;
    this.sounds.collect.volume = 0.2;
    this.sounds.slimeHit.volume = 0.2;
    this.sounds.slimeJump.volume = 0.2;
    this.backgroundMusic.play();
    localStorage.setItem('mute', 'false');
  }

  /** Toggles the muted state between muted and unmuted */
  toggleMute() {
    if (this.isMuted) this.unmute();
    else this.mute();
  }
}
