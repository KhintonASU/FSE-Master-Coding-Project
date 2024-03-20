

// Ball properties
var ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    dx: 2,
    dy: -2
};

// Update function
function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    //ctx.fillStyle = ";
    ctx.fill();
    ctx.closePath();

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce off walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    // Request animation frame
    requestAnimationFrame(update);
}

// // Update cursor position
// // canvas.addEventListener("mousemove", function (event) {
// //     var rect = canvas.getBoundingClientRect();
// //     var mouseX = event.clientX - rect.left;
// //     var mouseY = event.clientY - rect.top;

//     // Adjust ball's position based on cursor
//     ball.x = mouseX;
//     ball.y = mouseY;
// });

// Start the game
update();
