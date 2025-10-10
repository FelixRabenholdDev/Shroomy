let canvas;
let ctx;
let character = new MovableObject();

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    character.src = '../assets/img/2BlueWizardIdle/Chara - BlueIdle00000.png';
    character.onload = function() {
        // ctx.imageSmoothingEnabled = false;
        ctx.drawImage(character, 20, 300, 100, 100);
    }

    console.log("MyCharacter is", character);
    
   
}