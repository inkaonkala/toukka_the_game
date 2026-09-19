const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Load toukka pictures
const orangeImage = new Image();
orangeImage.src = "toukka_a.png";

const greenImage = new Image();
greenImage.src = "toukka_b.png";


// PLAYER 1
const player1 = {
    x: 100,
    y: 200,
    speed: 3,
    image: orangeImage
};


// PLAYER 2
const player2 = {
    x: 600,
    y: 200,
    speed: 3,
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
        player1.y -= player1.speed;
    }

    if (keys["s"]) {
        player1.y += player1.speed;
    }

    if (keys["a"]) {
        player1.x -= player1.speed;
    }

    if (keys["d"]) {
        player1.x += player1.speed;
    }


    // Green toukka: arrow keys

    if (keys["ArrowUp"]) {
        player2.y -= player2.speed;
    }

    if (keys["ArrowDown"]) {
        player2.y += player2.speed;
    }

    if (keys["ArrowLeft"]) {
        player2.x -= player2.speed;
    }

    if (keys["ArrowRight"]) {
        player2.x += player2.speed;
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