// Define your shapes here, you can use SVG paths or custom points
const shapes = [
    [[50, 50], [100, 50], [100, 100], [50, 100]], // Square
    [[150, 50], [200, 50], [200, 100], [150, 100]], // Rectangle
    [[250, 50], [300, 75], [250, 100], [200, 75]], // Triangle
    // Add more shapes as needed
];

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let currentShapeIndex = 0;
let currentShape = shapes[currentShapeIndex];
let isDrawing = false;

// Draw the current shape on the canvas
function drawShape() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(currentShape[0][0], currentShape[0][1]);
    for (let i = 1; i < currentShape.length; i++) {
        ctx.lineTo(currentShape[i][0], currentShape[i][1]);
    }
    ctx.closePath();
    ctx.stroke();
}

// Check if the user's cursor is within a certain distance of the shape
function isOnPath(x, y, threshold = 5) {
    for (let i = 0; i < currentShape.length; i++) {
        const [px, py] = currentShape[i];
        const distance = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
        if (distance < threshold) return true;
    }
    return false;
}

// Event listeners
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    if (isOnPath(mouseX, mouseY)) {
        isDrawing = true;
        ctx.strokeStyle = 'green';
    } else {
        ctx.strokeStyle = 'red';
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    currentShapeIndex++;
    if (currentShapeIndex < shapes.length) {
        currentShape = shapes[currentShapeIndex];
        drawShape();
    } else {
        alert('Game Over!');
        // You can reset the game or do something else here
    }
});
