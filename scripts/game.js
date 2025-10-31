/**
 * @fileoverview Main game script — handles initialization, keyboard and mobile controls,
 * sound management, and user interface events.
 */

/* -------------------------------------------------------------------------- */
/*                            Type Declarations                               */
/* -------------------------------------------------------------------------- */

/**
 * Represents the virtual game world rendered on a canvas.
 * @typedef {Object} World
 * @property {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @property {SoundManager} soundManager - Handles sound effects and music.
 * @property {function(): void} start - Starts the main game loop.
 * @property {function(): void} pause - Pauses the game loop.
 * @property {function(): void} reset - Resets the world to its initial state.
 */

/**
 * Represents the current state of user keyboard inputs.
 * @typedef {Object} Keyboard
 * @property {boolean} LEFT - Whether the left movement key is pressed.
 * @property {boolean} RIGHT - Whether the right movement key is pressed.
 * @property {boolean} UP - Whether the up key is pressed.
 * @property {boolean} DOWN - Whether the down key is pressed.
 * @property {boolean} SPACE - Whether the jump key (spacebar) is pressed.
 * @property {boolean} D - Whether the attack key is pressed.
 */

/**
 * Manages background music and sound effects.
 * @typedef {Object} SoundManager
 * @property {boolean} isMuted - Whether the sound is currently muted.
 * @property {function(): void} toggleMute - Toggles the sound on or off.
 */

/* -------------------------------------------------------------------------- */
/*                            Global Variables                                */
/* -------------------------------------------------------------------------- */

/** @type {HTMLCanvasElement} */
let canvas;

/** @type {World} */
let world;

/** @type {Keyboard} */
let keyboard = new Keyboard();

/** @type {SoundManager} */
let soundManager = new SoundManager();

/* -------------------------------------------------------------------------- */
/*                              Game Functions                                */
/* -------------------------------------------------------------------------- */

/**
 * Initializes the canvas and creates the game world.
 * Called when the game starts for the first time.
 */
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

/**
 * Displays the start screen and hides the end screen.
 */
function showStartScreen() {
  document.getElementById('startScreen').classList.remove('hidden');
  document.getElementById('endScreen').classList.add('hidden');
}

/**
 * Starts the game. Initializes or resets the world,
 * starts the game loop, and sets up sound control.
 */
function startGame() {
  document.getElementById('startScreen').classList.add('hidden');

  if (!world) {
    init();
  } else {
    world.reset();
  }

  world.start();

  const muteButton = document.getElementById('muteButton');
  if (muteButton) {
    if (world.soundManager?.isMuted) {
      muteButton.textContent = '🔇 Mute';
    }

    muteButton.addEventListener('click', () => {
      world.soundManager.toggleMute();
      muteButton.textContent = world.soundManager.isMuted
        ? '🔇 Mute'
        : '🔊 Sound';
    });
  }
}

/**
 * Displays the end screen (e.g., when the player loses).
 */
function showEndScreen() {
  document.getElementById('endScreen').classList.remove('hidden');
}

/**
 * Displays the win screen (e.g., when the player wins).
 */
function showWinScreen() {
  document.getElementById('winScreen').classList.remove('hidden');
}

/**
 * Restarts the game.
 * Hides the end/win screens, clears the current world, and starts a new one.
 */
function retryGame() {
  document.getElementById('endScreen').classList.add('hidden');
  document.getElementById('winScreen').classList.add('hidden');
  if (world) {
    world.pause();
    world.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  world = new World(canvas, keyboard);
  world.start();
}

/* -------------------------------------------------------------------------- */
/*                             Control Handling                               */
/* -------------------------------------------------------------------------- */

/**
 * Initializes mobile touch and mouse controls.
 * Adds event listeners for movement and action buttons.
 */
function initMobileControls() {
  const mobileControls = document.getElementById('mobileControls');
  if (!mobileControls) return;

  const buttons = mobileControls.querySelectorAll('.control-btn');

  buttons.forEach((btn) => {
    const action = btn.dataset.action;

    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      setKeyState(action, true);
    });

    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      setKeyState(action, false);
    });

    btn.addEventListener('mousedown', () => setKeyState(action, true));
    btn.addEventListener('mouseup', () => setKeyState(action, false));
    btn.addEventListener('mouseleave', () => setKeyState(action, false));
  });
}

/**
 * Sets the state of a control key (pressed or released) based on the given action.
 * @param {'left' | 'right' | 'jump' | 'attack'} action - The control action to update.
 * @param {boolean} state - The desired key state (true = pressed, false = released).
 */
function setKeyState(action, state) {
  switch (action) {
    case 'left':
      keyboard.LEFT = state;
      break;
    case 'right':
      keyboard.RIGHT = state;
      break;
    case 'jump':
      keyboard.SPACE = state;
      break;
    case 'attack':
      keyboard.D = state;
      break;
  }
}

/* -------------------------------------------------------------------------- */
/*                             UI / Overlays                                  */
/* -------------------------------------------------------------------------- */

/**
 * Opens the "Impressum" (legal notice) overlay.
 * @param {Event} event - The click event that triggered the action.
 */
function openImpressum(event) {
  event.preventDefault();
  document.getElementById('impressumOverlay').classList.remove('hidden');
}

/**
 * Closes the "Impressum" (legal notice) overlay.
 */
function closeImpressum() {
  document.getElementById('impressumOverlay').classList.add('hidden');
}

/* -------------------------------------------------------------------------- */
/*                            Keyboard Events                                 */
/* -------------------------------------------------------------------------- */

/**
 * Sets up keyboard input event listeners for desktop users.
 */
window.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
  if (event.key === 'ArrowRight') keyboard.RIGHT = true;
  if (event.key === 'ArrowLeft') keyboard.LEFT = true;
  if (event.key === 'd') keyboard.D = true;
  if (event.key === 'ArrowDown') keyboard.DOWN = true;
  if (event.key === 'ArrowUp') keyboard.UP = true;
  if (event.key === ' ') {
    event.preventDefault();
    keyboard.SPACE = true;
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
  if (event.key === 'ArrowRight') keyboard.RIGHT = false;
  if (event.key === 'ArrowLeft') keyboard.LEFT = false;
  if (event.key === 'ArrowDown') keyboard.DOWN = false;
  if (event.key === 'ArrowUp') keyboard.UP = false;
  if (event.key === ' ') {
    event.preventDefault();
    keyboard.SPACE = false;
  }
  if (event.key === 'd') keyboard.D = false;
});

/* -------------------------------------------------------------------------- */
/*                           Initialization Event                             */
/* -------------------------------------------------------------------------- */

/**
 * Initializes mobile controls after the DOM has fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  initMobileControls();
});
