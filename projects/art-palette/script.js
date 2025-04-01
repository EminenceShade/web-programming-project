const imageInput = document.getElementById("imageInput");
const imageCanvas = document.getElementById("imageCanvas");
const extractColorsBtn = document.getElementById("extractColorsBtn");
const randomPaletteBtn = document.getElementById("randomPaletteBtn");
const compareContrastBtn = document.getElementById("compareContrastBtn");
const savePaletteBtn = document.getElementById("savePaletteBtn");
const downloadPaletteBtn = document.getElementById("downloadPaletteBtn");
const savedPalettesContainer = document.getElementById("savedPalettesContainer");
const paletteContainer = document.getElementById("paletteContainer");

let extractedColors = [];

imageInput.addEventListener("change", handleImageUpload);
extractColorsBtn.addEventListener("click", extractColors);
randomPaletteBtn.addEventListener("click", generateRandomPalette);
compareContrastBtn.addEventListener("click", compareContrast);
savePaletteBtn.addEventListener("click", savePalette);
downloadPaletteBtn.addEventListener("click", downloadPaletteAsPNG);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
            const ctx = imageCanvas.getContext("2d");
            imageCanvas.width = img.width / 3;
            imageCanvas.height = img.height / 3;
            ctx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
        };
    };
    reader.readAsDataURL(file);
}

function extractColors() {
    const ctx = imageCanvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
    const pixels = imgData.data;

    const colorMap = new Map();
    for (let i = 0; i < pixels.length; i += 4) {
        const color = `rgb(${pixels[i]},${pixels[i + 1]},${pixels[i + 2]})`;
        colorMap.set(color, (colorMap.get(color) || 0) + 1);
    }

    extractedColors = [...colorMap.keys()].slice(0, 5);
    displayPalette(extractedColors);
}

function compareContrast() {
    if (extractedColors.length === 0) return;

    extractedColors.sort((a, b) => getLuminance(b) - getLuminance(a));
    displayPalette(extractedColors);
}

function getLuminance(rgb) {
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function generateRandomPalette() {
    extractedColors = Array.from({ length: 5 }, () =>
        `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
    );
    displayPalette(extractedColors);
}

function displayPalette(colors) {
    paletteContainer.innerHTML = "";
    colors.forEach(color => {
        const colorBox = document.createElement("div");
        colorBox.className = "color-box";
        colorBox.style.background = color;
        paletteContainer.appendChild(colorBox);
    });
}

function savePalette() {
    if (!extractedColors.length) return;

    const paletteDiv = document.createElement("div");
    paletteDiv.className = "saved-palette";

    extractedColors.forEach(color => {
        const box = document.createElement("div");
        box.className = "color-box";
        box.style.background = color;
        paletteDiv.appendChild(box);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => paletteDiv.remove();
    paletteDiv.appendChild(deleteBtn);

    savedPalettesContainer.appendChild(paletteDiv);
}

function downloadPaletteAsPNG() {
    if (!extractedColors.length) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = 500;
    const height = 100;
    canvas.width = width;
    canvas.height = height;

    extractedColors.forEach((color, index) => {
        ctx.fillStyle = color;
        ctx.fillRect((width / extractedColors.length) * index, 0, width / extractedColors.length, height);
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "palette.png";
    link.click();

    downloadRGBAsText();
}

function downloadRGBAsText() {
    const textContent = extractedColors.join("\n");
    const blob = new Blob([textContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "palette_colors.txt";
    link.click();
}
