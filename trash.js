export class Trash {
    constructor(x, y, imagSrc) {

        this.x = x;
        this.y = y;

        this.image = new Image();
        this.image.src = imagSrc;

        this.collected = false;
    }

    draw(ctx) {
        if (this.collected)
            return;

        ctx.drawImage(this.image, this.x, this.y);
    }
}