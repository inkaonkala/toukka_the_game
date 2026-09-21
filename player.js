export class Player {

    constructor(x, y, imagSrc, startDir) {
        this.x = x;
        this.y = y;
        this.speed = 3;

        this.move_x = startDir * this.speed;
        this.move_y = 0;

        this.image = new Image();
        this.image.src = imagSrc;

    }

    moveUp() {
        this.move_x = 0;
        this.move_y = -this.speed;
    }


    moveDown() {
        this.move_x = 0;
        this.move_y = this.speed;
    }


    moveLeft() {
        this.move_x = -this.speed;
        this.move_y = 0;
    }


    moveRight() {
        this.move_x = this.speed;
        this.move_y = 0;
    }


    move() {
        this.x += this.move_x;
        this.y += this.move_y;
    }


    wrapAround(canvas) {

        if (this.x > canvas.width) {
            this.x = 0;
        }

        if (this.x < 0) {
            this.x = canvas.width;
        }

        if (this.y > canvas.height) {
            this.y = 0;
        }

        if (this.y < 0) {
            this.y = canvas.height;
        }
    }


    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.x,
            this.y
        );
    }
}