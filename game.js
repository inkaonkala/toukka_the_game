import { Player } from "./player.js";
import { Trash } from "./trash.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const MAX_TRASH = 3;
const trash = [];


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

//TRASH TEST
//const trash1 = new Trash(
//    400, 300,
//    "assets/trash1.png"
//)


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


function spawn_trash() {
    const x = Math.random() * (canvas.width - 32);
    const y = Math.random() * (canvas.height - 32);

    const newTrash = new Trash(
        x,
        y,
        "assets/trash1.png"
    );

    trash.push(newTrash)
}

function update() {

    handleInput();

    player1.move();
    player2.move();

    player1.wrapAround(canvas);
    player2.wrapAround(canvas);

    for (const item of trash) {

        if (item.collisionCheck(player1)) {
            console.log("ORANGE 1 point");
            player1.grow();
        }
        if (item.collisionCheck(player2)) {
            console.log("GREEN 1 point")
            player2.grow();
        }
    }

    for (let i = trash.length - 1; i >= 0; i--) {
        if (trash[i].collected)
                trash.splice(i, 1);
    }

    while (trash.length < MAX_TRASH)
        spawn_trash();
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
    for (const item of trash)
        item.draw(ctx);
//    trash1.draw(ctx);
}


function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);
}


for (let i = 0; i < MAX_TRASH; i++)
        spawn_trash();

gameLoop();