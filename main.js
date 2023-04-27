const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
canvas.width = window.innerWidth * 0.5;
canvas.height = window.innerHeight * 0.5;

const keys = [];

const player = {
    x: (canvas.width / 2) - 8,
    y: (canvas.height / 2) - 16,
    width: 16,
    height: 32,
    frameX: 0,
    frameY: 3,
    speed: 2,
    moving: false,
}

const playerSprite = new Image()
playerSprite.src = 'assets/IsoHumanWalk-Sheet.png'

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

window.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

window.addEventListener("keyup", function(e) {
    delete keys[e.keyCode];
});

function movePlayer() {
    if(keys[87]){//north
        player.y -= player.speed;
        player.frameY = 7;
    }
    if(keys[83]){//south
        player.y += player.speed;
        player.frameY = 3;
    }
    if(keys[65]){//east
        player.x -= player.speed;
        player.frameY = 5;
    }
    if(keys[68]){//west
        player.x += player.speed;
        player.frameY = 1;
    }
}

function handlePlayerFrame(){
    if(player.frameX < 7) player.frameX++;
    else player.frameX = 0;
}

// function animate (){
//     console.log(keys);
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     drawSprite(playerSprite,
//         player.width * player.frameX, player.height * player.frameY,
//         player.width, player.height,
//         player.x, player.y,
//         player.width, player.height);
//     movePlayer();
//     handlePlayerFrame();
//     requestAnimationFrame(animate)
// }

// animate();

let fps, fpsInterval, startTime, now, then, elapsed;

function init(fps){
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate(){
    requestAnimationFrame(animate)
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval)
        console.log(keys);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawSprite(playerSprite,
        player.width * player.frameX, player.height * player.frameY,
        player.width, player.height,
        player.x, player.y,
        player.width, player.height);
        movePlayer();
        handlePlayerFrame();
    }
}

init(60);
