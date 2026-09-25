import { Player } from "./player.js";
import { Trash } from "./trash.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const MAX_TRASH = 3;
const trash = [];

let gameStart = false;
let gameOver = false;
let winner = "";

//MUSIC
const music = new Audio("assets/toukka.wav");
const burb = new Audio("assets/BIGburb.mp3");
const nom = new Audio("assets/NOM.mp3");
music.loop = true;
music.volume = 0.5;
burb.volume = 0.7;
nom.volume = 0.9;


// CREATE PLAYERS

let player1 = createPlayer1();

function createPlayer1() {
    return new Player(
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
}

let player2 = createPlayer2();

function createPlayer2() {
    return new Player(
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
}

//TRASH TEST
//const trash1 = new Trash(
//    400, 300,
//    "assets/trash1.png"
//)


// KEYBOARD

const keys = {};

window.addEventListener("keydown", function(event) {
    keys[event.key] = true;

    if (event.code === "Space") {
        if (!gameStart) {
            gameStart = true;
            music.play()
        }
        else if (gameOver)
            restartGame();
    }
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

    if (!gameStart || gameOver)
        return; 

    handleInput();

    player1.move();
    player2.move();

    player1.wrapAround(canvas);
    player2.wrapAround(canvas);

    // PLAYER COLLISION


    if ( !gameOver && player1.canAttack() && player1.collisionCheck(player2)) {
        console.log("ORANGE HIT GREEN");
        if (player2.shrink()) {
            nom.play();
            player1.grow();
            if (player2.hasNoBody()) {
                gameOver = true;
                burb.play();
                winner = "ORANGE";
            }
        }
        player1.startAttackCooldown();
        
    }

    if ( !gameOver && player2.canAttack() && player2.collisionCheck(player1)) {
        console.log("GREEN HIT ORANGE");
        if (player1.shrink()) {
            nom.play();
            player2.grow();
            if (player1.hasNoBody()) {
                gameOver = true;
                burb.play();
                winner = "GREEN";
            }
        }
        player2.startAttackCooldown();
    }

    //TRASH COLLISION
    for (const item of trash) {

        if (item.collisionCheck(player1)) {
            console.log("ORANGE 1 point");
            nom.play();
            player1.grow();
            
        }
        if (item.collisionCheck(player2)) {
            console.log("GREEN 1 point")
            nom.play();
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

    //START SCREEN
    if (!gameStart) {
        drawStartScreen();
        return;
    }

    player1.draw(ctx);
    player2.draw(ctx);
    for (const item of trash)
        item.draw(ctx);
//    trash1.draw(ctx);

    if (gameOver)
        drawGameOver();
}


function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);
}


for (let i = 0; i < MAX_TRASH; i++)
        spawn_trash();

gameLoop();

function drawStartScreen() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.textAlign = "center";

    ctx.font = "60px monospace";
    ctx.fillText(
        "TOUKKA",
        canvas.width / 2,
        250
    );

    ctx.font = "24px monospace";
    ctx.fillText(
        "PRESS SPACE",
        canvas.width / 2,
        330
    );
}

function drawGameOver() {

    ctx.textAlign = "center";

    ctx.font = "48px monospace";

    ctx.fillText(
        winner + " WINS!",
        canvas.width / 2,
        250
    );

    ctx.font = "24px monospace";

    ctx.fillText(
        "PRESS SPACE TO PLAY AGAIN",
        canvas.width / 2,
        320
    );
}

function restartGame() {
    player1 = createPlayer1();
    player2 = createPlayer2();

    trash.length = 0;

    for (let i = 0; i < MAX_TRASH; i++)
        spawn_trash();

    winner = "";
    gameOver = false;
    gameStart = true;
}