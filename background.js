class Background {

    constructor(background) {
        this.canvas = document.getElementById("myCanvas");
        this.image = resourceManager.getImageSource(background);
    }

    move(dt) {
    }

    draw(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.drawImage(this.image, 0, 0, 1300, 450)
        ctx.restore()
    }
}