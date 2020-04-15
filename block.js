class block{
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.image = resourceManager.getImageSource('block');

        this.x = 200;
        this.y = 800;
        this.size = 200;
    }

    move(dt){
        this.x += this.dx * dt
        this.y += 0 * dt
    }

    draw(ctx){
        ctx.save()
        ctx.drawImage(this.image,0,590,110,110)
        ctx.restore()
    }
}