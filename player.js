const PART_DIS = 8;


export class Player {

    constructor(x, y, images, startDir) {
    //    this.x = x;
    //    this.y = y;
        this.speed = 3;

        this.move_x = startDir * this.speed;
        this.move_y = 0;

     //   this.image = new Image();
     //   this.image.src = imagSrc;
        this.images = {};

        for (const name in images) {
            this.images[name] = new Image();
            this.images[name].src = images[name];
        }

        this.history = [];

        this.parts = [
            {
                type: "head",
                x: x,
                y: y,
                followDis: 0
            },
            {
                type: "body",
                x: x - 20 * startDir,
                y: y,
                followDis: 8
            },
            {
                type: "butt",
                x: x - 30 * startDir,
                y: y,
                followDis: 13
            }
        ];

    }

    moveUp() {
        if (this.move_y > 0)
            return;
        this.move_x = 0;
        this.move_y = -this.speed;
    }


    moveDown() {
        if (this.move_y < 0)
                return;
        this.move_x = 0;
        this.move_y = this.speed;
    }


    moveLeft() {

        if (this.move_x > 0)
            return;
        this.move_x = -this.speed;
        this.move_y = 0;
    }


    moveRight() {
        if (this.move_x < 0)
            return;
        this.move_x = this.speed;
        this.move_y = 0;
    }


    move() {

        const head = this.parts[0];

        head.x  += this.move_x;
        head.y += this.move_y;

        head.move_x = this.move_x;
        head.move_y = this.move_y;

        //save head x,y
        this.history.unshift({
            x: head.x,
            y: head.y,
            move_x: this.move_x,
            move_y: this.move_y
        });

        for (let i = 1; i < this.parts.length; i++) {
            const historyIndex = this.parts[i].followDis;

            if (this.history[historyIndex]) {
                const oldPosition = this.history[historyIndex];

                this.parts[i].x = oldPosition.x;
                this.parts[i].y = oldPosition.y;

                this.parts[i].move_x = oldPosition.move_x;
                this.parts[i].move_y = oldPosition.move_y;
            }
        }
    }


    wrapAround(canvas) {

        const head = this.parts[0];

        if (head.x > canvas.width) {
            head.x = 0;
        }

        if (head.x < 0) {
            head.x = canvas.width;
        }

        if (head.y > canvas.height) {
            head.y = 0;
        }

        if (head.y < 0) {
            head.y = canvas.height;
        }
    }   


    draw(ctx) {

        for (const part of this.parts) {

            let image;

            if (part.type === "head") {
                image = this.images.s1;
            }
            else if (part.type === "body") {
                image = this.images.s2;
            }
            else if (part.type === "butt") {
                image = this.images.s3;
            }

            ctx.drawImage(
                image,
                part.x,
                part.y
            );
        }
    }
}