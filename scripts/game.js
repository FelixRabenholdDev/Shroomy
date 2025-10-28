let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

function showStartScreen() {
  document.getElementById("startScreen").classList.remove("hidden");
  document.getElementById("endScreen").classList.add("hidden");
}

function startGame() {
  document.getElementById("startScreen").classList.add("hidden");
  if (!world) {
        init();
    }
    world.reset();
    world.start();
}

function showEndScreen() {
  document.getElementById("endScreen").classList.remove("hidden");
}

function retryGame() {
    document.getElementById("endScreen").classList.add("hidden");
    if (world) {
        world.pause();
        world.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    world = new World(canvas, keyboard);
    world.start();
}

window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if (event.key === "ArrowLeft") {
        keyboard.LEFT = true;
    }
    if (event.key === "d") {
        keyboard.D = true;
    }
    if (event.key === "ArrowDown") {
        keyboard.DOWN = true;
    }
    if (event.key === "ArrowUp") {
        keyboard.UP = true;
    }
    if (event.key === " ") {
        keyboard.SPACE = true;
    }
    console.log(event);
});

window.addEventListener("keyup", (event) => {
    if (event.key === "ArrowRight") {
        keyboard.RIGHT = false;
    }
    if (event.key === "ArrowLeft") {
        keyboard.LEFT = false;
    }
    if (event.key === "ArrowDown") {
        keyboard.DOWN = false;
    }
    if (event.key === "ArrowUp") {
        keyboard.UP = false;
    }
    if (event.key === " ") {
        keyboard.SPACE = false;
    }
    if (event.key === "d") {
        keyboard.D = false;
    }
});
