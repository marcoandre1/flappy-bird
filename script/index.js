const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// sets canvas width and height for mobile, could be a resize in future if needed
if (window.innerWidth < 400) {
    canvas.width = 300;
    canvas.height = 300;
} else {
    canvas.width = 400;
    canvas.height = 400;
}

// sets the pixels in a rectangular area to transparent black
ctx.clearRect(0, 0, canvas.width, canvas.height);

let x = canvas.width === 300 ? 150 : 200;
let y = canvas.width === 300 ? 250 : 350;

let score = 0;
let speed = 25;
let previousTimeStamp = performance.now();

// game loop
function loop(timestamp) {

    const elapsed = (timestamp - previousTimeStamp) / 1000;

    if (canvas.width === 300) {
        if (y <= 250) {
            speed += 50 * elapsed;
            y += speed * elapsed;
        }
    } else {
        if (y <= 350) {
            speed += 50 * elapsed;
            y += speed * elapsed;
        }
    }

    // commonly required at the start of each frame in an animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const fps = Math.round(1 / elapsed);
    ctx.font = 'caption';
    ctx.fillStyle = 'white';
    ctx.fillText("device FPS: " + fps, 20, 50);

    //draw score
    ctx.font = 'caption';
    ctx.fillStyle = 'white';
    ctx.fillText("Score: " + score, 20, 30);
    
    ctx.beginPath()
    ctx.arc(x, y, 50, 0, 2 * Math.PI);
    ctx.fillStyle="red";
    ctx.fill();

    if (canvas.width === 300) {
        if (y > 250) {
            score = 0
        }
    } else {
        if (y > 350) {
            score = 0
        }
    }

    previousTimeStamp = timestamp;

    // keeps the loop going
    window.requestAnimationFrame(loop);
}

// initialize the loop
window.requestAnimationFrame(loop);

document.addEventListener("keydown", (event) => {
    score += 1;
    y -= 25;
    speed = 25;
});

document.addEventListener('touchstart', e => {
    score += 1;
    y -= 25;
    speed = 25;
})
