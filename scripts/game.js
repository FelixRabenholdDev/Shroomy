let canvas;
let world;


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas);
    // character.onload = function() {
    // ctx.imageSmoothingEnabled = false;
    //     ctx.drawImage(character, 20, 300, 100, 100);
    // }

    console.log("MyCharacter is", world.character);
    
   
}