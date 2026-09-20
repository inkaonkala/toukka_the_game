const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Load toukka pictures
const orangeImage = new Image();
orangeImage.src = "toA.png";

const greenImage = new Image();
greenImage.src = "toB.png";


// PLAYER 1
const player1 = {
    x: 100,
    y: 150,
    speed: 3,
    move_x: 3,
    move_y: 0,
    image: orangeImage
};


// PLAYER 2
const player2 = {
    x: 600,
    y: 250,
    speed: 3,
    move_x: -3,
    move_y: 0,
    image: greenImage
};


// Keep track of pressed keys
const keys = {};

window.addEventListener("keydown", function(event) {
    keys[event.key] = true;
});

window.addEventListener("keyup", function(event) {
    keys[event.key] = false;
});


function movePlayers() {

    // Orange toukka: WASD

    if (keys["w"]) {
        player1.move_x = 0;
        player1.move_y = -player1.speed;
    }

    if (keys["s"]) {
        player1.move_x = 0;
        player1.move_y = +player1.speed;
    }

    if (keys["a"]) {
        player1.move_y = 0;
        player1.move_x = -player1.speed;
    }

    if (keys["d"]) {
        player1.move_y = 0;
        player1.move_x = +player1.speed;
    }


    // Green toukka: arrow keys

    if (keys["ArrowUp"]) {
        player2.move_x = 0;
        player2.move_y = -player2.speed;
    }

    if (keys["ArrowDown"]) {
        player2.move_x = 0;
        player2.move_y = +player2.speed;
    }

    if (keys["ArrowLeft"]) {
        player2.move_y = 0;
        player2.move_x = -player2.speed;
    }

    if (keys["ArrowRight"]) {
        player2.move_y = 0;
        player2.move_x = +player2.speed;
    }

    //make const movement
    player1.x += player1.move_x;
    player1.y += player1.move_y;

    player2.x += player2.move_x;
    player2.y += player2.move_y;

    // Wrap around screen edges

// PLAYER 1
if (player1.x > canvas.width) {
    player1.x = 0;
}

if (player1.x < 0) {
    player1.x = canvas.width;
}

if (player1.y > canvas.height) {
    player1.y = 0;
}

if (player1.y < 0) {
    player1.y = canvas.height;
}


// PLAYER 2
if (player2.x > canvas.width) {
    player2.x = 0;
}

if (player2.x < 0) {
    player2.x = canvas.width;
}

if (player2.y > canvas.height) {
    player2.y = 0;
}

if (player2.y < 0) {
    player2.y = canvas.height;
}
}


function draw() {

    // Clear old frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw players
    ctx.drawImage(
        player1.image,
        player1.x,
        player1.y
    );

    ctx.drawImage(
        player2.image,
        player2.x,
        player2.y
    );
}


function gameLoop() {

    movePlayers();
    draw();

    requestAnimationFrame(gameLoop);
}


gameLoop();