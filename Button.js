class Button {

    constructor(id,x, y , width, height,imgName) {
        this.canvas = document.getElementById("myCanvas");
        this.image = resourceManager.getImageSource(imgName);

        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.id=id;

    }

    move(dt) {

        if(game.mousePosition.x>this.x && game.mousePosition.y>this.y && game.mousePosition.x<(this.x+this.width) && game.mousePosition.y<(this.y+this.height)){
            if(game.mousePressed){
                //debugger;
                if(this.id=='level'){
                    if(game.music.play_started) game.music.play();
                    game.objects = level();
                    game.mousePressed=false;}
                if(this.id=='menu'){
                    game.objects = menu();}
                if(this.id=='info'){
                    game.objects = info();
                    game.mousePressed=false;}
                if(this.id=='GameOver'){
                    game.objects = GameOver();}
                if(this.id=='sound'){
                        if(game.music.play_started){
                            game.music.stop();
                        }
                        else{
                            game.music.play();
                        }
                        game.mousePressed=false;
                }
            }
            console.log("hover: "+this.id);
        }}

    draw(ctx) {
        ctx.save()
        ctx.drawImage(this.image,this.x, this.y, this.width, this.height )
        ctx.restore()
    }
}