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

    collisionCheck(player) {
        if(this.collected)
            return false;

        const head = player.parts[0];

        const trashLeft = this.x;
        const trashRight = this.x + this.image.width;
        const trashTop = this.y;
        const trashBottom = this.y + this.image.height;

        const headImage = player.images.s1;

            const headLeft = head.x;
         const headRight = head.x + headImage.width;
        const headTop = head.y;
        const headBottom = head.y + headImage.height;

        if (
            headRight > trashLeft &&
            headLeft < trashRight &&
            headBottom > trashTop &&
            headTop < trashBottom
        ) {
            this.collected = true;
            return true;
        }

        return false;

    }
}