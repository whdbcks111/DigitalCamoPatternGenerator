/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const pallete_dtshirt = [['#6c705c', 5],['#4c5c37', 1],['#574840', 1],['#d3d3bc', 1],['#282927', 4]];
const pallete_karmy = [['#5c695d', 5],['#414e2f', 1],['#3b302a', 1],['#aca299', 1],['#212221', 3]];

let pixelSize = 8;
let selectedPreset = pallete_karmy;
let customPalleteCount = 2;

const presetCopy = document.querySelector('.preset.hidden');

/**
 * @type {HTMLInputElement}
 */
let pixelSizeInput = document.querySelector('.pixel-size');
pixelSizeInput.onchange = _ => {
    pixelSize = parseInt(pixelSizeInput.value);
    drawCamo(selectedPreset, pixelSize);
}

/**
 * @type {HTMLInputElement}
 */
let canvasXInput = document.querySelector('.canvas-size-x');
canvasXInput.onchange = _ => {
    canvas.width = parseInt(canvasXInput.value);
    drawCamo(selectedPreset, pixelSize);
}

/**
 * @type {HTMLInputElement}
 */
let canvasYInput = document.querySelector('.canvas-size-y');
canvasYInput.onchange = _ => {
    canvas.height = parseInt(canvasYInput.value);
    drawCamo(selectedPreset, pixelSize);
}

const saveButton = document.getElementById('save');
saveButton.onclick = _ => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'my-canvas-image.png';
    link.href = dataURL;
    link.click();
}

const addPalleteBtn = document.getElementById('add-pallete');
addPalleteBtn.onclick = _ => {
    addPresetElement("커스텀 " + (++customPalleteCount), null);
}



canvas.width = 3000;
canvas.height = 3000;

function drawPattern(pallete, pixelSize = 10, chance = 0.4) {
    let totalWeight = 0;
    pallete.forEach(pair => totalWeight += pair[1]);

    for(let x = 0; x < canvas.width / pixelSize; x++) {
        for(let y = 0; y < canvas.height / pixelSize; y++) {
            if(Math.random() >= chance) continue;

            let rand = Math.random();
            let acc = 0;
            for(let pair of pallete) {
                acc += pair[1] / totalWeight;
                if(rand < acc) {
                    ctx.fillStyle = pair[0];
                    break;
                }
            }

            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }   
    }
}

function drawCamo(pallete, basePixelSize) {
    ctx.fillStyle = pallete[0][0];
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawPattern(pallete, basePixelSize * 10, 0.5);
    drawPattern(pallete, basePixelSize * 8, 0.2);
    drawPattern(pallete, basePixelSize * 7, 0.15);
    drawPattern(pallete, basePixelSize * 6, 0.3);
    drawPattern(pallete, basePixelSize * 5, 0.5);
    drawPattern(pallete, basePixelSize * 4, 0.2);
    drawPattern(pallete, basePixelSize * 3, 0.5);
    drawPattern(pallete, basePixelSize * 2, 0.3);
    drawPattern(pallete, basePixelSize, 0.2);
}

function addPresetElement(name, pallete) {
    /**
     * @type {HTMLDivElement}
     */
    let e = presetCopy.cloneNode(true);
    e.classList.remove('hidden');

    e.querySelector('.title').innerText = pallete ? '프리셋 - ' + name : name;

    let colorInputs = e.querySelector('.colors').querySelectorAll('input[type=color]');
    let weightInputs = e.querySelector('.colors').querySelectorAll('input[type=number]');

    if(pallete) {
        for(let i = 0; i < colorInputs.length; i++) {
            colorInputs[i].value = pallete[i][0];
            weightInputs[i].value = pallete[i][1];
        }
    }
    else {
        weightInputs.forEach(e => e.value = 1);
    }

    e.querySelector('input[type=button]').onclick = _ => {
        let p = [];
        for(let i = 0; i < colorInputs.length; i++) {
            p.push([colorInputs[i].value, parseInt(weightInputs[i].value)]);
        }
        console.log(p)
        drawCamo(selectedPreset = p, pixelSize);
    }

    document.body.appendChild(e);
}

addPresetElement("디지털티", pallete_dtshirt);
addPresetElement("디지털군복", pallete_karmy);

for(let i = 1; i <= customPalleteCount; i++)
    addPresetElement("커스텀 " + i, null);

drawCamo(selectedPreset, pixelSize);