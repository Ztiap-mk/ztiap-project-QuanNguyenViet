let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

    const IMAGE = [
        {name: 'block', src: 'assets/img/block.png'},
        {name: 'coins', src: 'assets/img/coins.png'},
        {name: 'enemy', src: 'assets/img/enemy.png'},
        {name: 'player', src: 'assets/img/player.png'},
        {name: 'star', src: 'assets/img/star.png'}
    ];

    class Block{
        constructor() {
            this.canvas = document.getElementById("myCanvas");
            this.image = resourceManager.getImageSource('block');

            this.x = 800;
            this.y = 600;
            this.size = 200;
        }
    }

    class ResourceManager{
        loadedImages = new Map();

        async init(){
            await this.loadImages();
        }

        async loadImages(){
            await Promise.all(
                IMAGE.map(image => this.loadImage(image))
            )
        }

        async loadImage(imgResource) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = imgResource.src;
                img.onload = () => {
                    this.loadedImages.set(imgResource.name, img);
                    resolve(img);
                }
                img.onerror = (err) => {
                    reject(err);
                }
            });
        }

        getImageSource(imageName) {
            const image = this.loadedImages.get(imageName);
            if (image == null) {
                throw new Error(`Image '${imageName}' not found`);
            }
            return image;
        }
    }

    const resourceManager = new ResourceManager();

    class Game{
        time = Date.now();

        canvas = document.getElementById("myCanvas")
        ctx = canvas.getContext("2d");

        objects = [];

        async start(){
            console.log('start');
            await resourceManager.init();
            console.log('nacitane');

            this.blockImage = resourceManager.getImageSource("block");
            this.objects.push(new Block());

            this.startLoop();
        }
        //game loop
        startLoop(){
            this.time = Date.now();
            this.step();
        }
        //deltatime
        step(){
            const now = Date.now();
            const dt = (now - this.time) / 100;
            this.time = now;

            this.move(dt);
            this.render();
            requestAnimationFrame(() =>this.step());
        }

        move(dt){
            this.objects.forEach((object) =>{
                object.move(dt);
            });
        }

        clearCtx(){
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(0,0,900,700);
        }

        render(){
            this.clearCtx();
            this.ctx.drawImage(this.blockImage, 500,400);

            this.objects.forEach((object) =>{
                object.draw(this.ctx);
            })
        }
    }