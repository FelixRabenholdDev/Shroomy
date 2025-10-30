let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

function showStartScreen() {
  document.getElementById('startScreen').classList.remove('hidden');
  document.getElementById('endScreen').classList.add('hidden');
}

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
      muteButton.textContent = '🔇 Stumm';
    }

    muteButton.addEventListener('click', () => {
      world.soundManager.toggleMute();
      muteButton.textContent = world.soundManager.isMuted
        ? '🔇 Stumm'
        : '🔊 Sound';
    });
  }
}

function showEndScreen() {
  document.getElementById('endScreen').classList.remove('hidden');
}

function showWinScreen() {
  document.getElementById('winScreen').classList.remove('hidden');
}

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

window.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
  if (event.key === 'ArrowRight') {
    keyboard.RIGHT = true;
  }
  if (event.key === 'ArrowLeft') {
    keyboard.LEFT = true;
  }
  if (event.key === 'd') {
    keyboard.D = true;
  }
  if (event.key === 'ArrowDown') {
    keyboard.DOWN = true;
  }
  if (event.key === 'ArrowUp') {
    keyboard.UP = true;
  }
  if (event.key === ' ') {
    event.preventDefault();
    keyboard.SPACE = true;
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
  if (event.key === 'ArrowRight') {
    keyboard.RIGHT = false;
  }
  if (event.key === 'ArrowLeft') {
    keyboard.LEFT = false;
  }
  if (event.key === 'ArrowDown') {
    keyboard.DOWN = false;
  }
  if (event.key === 'ArrowUp') {
    keyboard.UP = false;
  }
  if (event.key === ' ') {
    event.preventDefault();
    keyboard.SPACE = false;
  }
  if (event.key === 'd') {
    keyboard.D = false;
  }
});

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

function openImpressum(event) {
  event.preventDefault();
  document.getElementById('impressumOverlay').classList.remove('hidden');
}

function closeImpressum() {
  document.getElementById('impressumOverlay').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileControls();
});
