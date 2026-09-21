import { Player } from "./player.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


// CREATE PLAYERS

const player1 = new Player(
    100,
    150,
    "assets/A1.png",
    1
);

const player2 = new Player(
    600,
    250,
    "assets/toB.png",
    -1
);


// KEYBOARD

const keys = {};

window.addEventListener("keydown", function(event) {
    keys[event.key] = true;
});

window.addEventListener("keyup", function(event) {
    keys[event.key] = false;
});


function handleInput() {

    // PLAYER 1

    if (keys["w"]) {
        player1.moveUp();
    }

    if (keys["s"]) {
        player1.moveDown();
    }

    if (keys["a"]) {
        player1.moveLeft();
    }

    if (keys["d"]) {
        player1.moveRight();
    }


    // PLAYER 2

    if (keys["ArrowUp"]) {
        player2.moveUp();
    }

    if (keys["ArrowDown"]) {
        player2.moveDown();
    }

    if (keys["ArrowLeft"]) {
        player2.moveLeft();
    }

    if (keys["ArrowRight"]) {
        player2.moveRight();
    }
}


function update() {

    handleInput();

    player1.move();
    player2.move();

    player1.wrapAround(canvas);
    player2.wrapAround(canvas);
}


function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    player1.draw(ctx);
    player2.draw(ctx);
}


function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);
}


gameLoop();