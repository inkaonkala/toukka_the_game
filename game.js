import { Player } from "./player.js";
import { Trash } from "./trash.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


// CREATE PLAYERS

const player1 = new Player(
    100,
    150,
    {
        s1: "assets/A1.png",
        s2: "assets/A2.png",
        s3: "assets/A3.png",

        u1: "assets/A1d.png",
        u2: "assets/A2d.png",
        u3: "assets/A3d.png"
    },
    1
);

const player2 = new Player(
    600,
    250,
    {
        s1: "assets/B1.png",
        s2: "assets/B2.png",
        s3: "assets/B3.png",

        u1: "assets/B1d.png",
        u2: "assets/B2d.png",
        u3: "assets/B3d.png"
    },
    -1
);

const trash1 = new Trash(
    400, 300,
    "assets/trash1.png"
)


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

    if (trash1.collisionCheck(player1)) {
        console.log("ORANGE 1 point");
        player1.grow();
    }
    if (trash1.collisionCheck(player2)) {
        console.log("GREEN 1 point")
        player2.grow();
    }

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
    trash1.draw(ctx);
}


function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);
}


gameLoop();