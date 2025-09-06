/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 1024;

let colors = ['#798366','#4c5c37','#574840','#dad1bf','#282927']

function drawPattern(pixelSize = 10, chance = 0.4) {
    for(let x = 0; x < canvas.width / pixelSize; x++) {
        for(let y = 0; y < canvas.height / pixelSize; x++) {
            if(Math.random() >= chance) continue;
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }   
    }
}

ctx.fillStyle = colors[0];
ctx.fillRect(0, 0, canvas.width, canvas.height);

drawPattern(8);
drawPattern(16);
drawPattern(32);
drawPattern(64);
drawPattern(128);