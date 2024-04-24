let shapes = [];
let targets = [];
let game2score = 0;
let game2Started = false;
let game2timer = 0;
const gameTime = 20; // 20 seconds

function game2Preload() {
}

function game2Setup() {
  currentActivity = 3;
  createCanvas(720, 400);
  
  // Create targets on the left side
  targets.push(new Target(50, height / 2, 'triangle'));
  targets.push(new Target(50, height / 2 + 100, 'square'));
  targets.push(new Target(50, height / 2 - 100, 'circle'));

  homeButton.show();
  faizanButton.hide();
  kaviousButton.hide();
  museveniButton.hide();
  noahButton.hide();

  faizanDetailsText.hide();
  kaviousDetailsText.hide();
  museveniDetailsText.hide();
  noahDetailsText.hide();

  // Listen for key presses
  document.addEventListener('keydown', keyPressed);
}

function game2Draw() {
  if (!game2Started
) {
    // Display start screen
    background(200);
    textSize(24);
    fill(0);
    text('INSTRUCTIONS:', width/2 - 100, height/2 - 100);
    text(' Drag as many shapes as possible to the matching target.', width/2 - 300, height/2 -  50);
    text('you have 20 seconds to complete this task.', width/2 - 200, height/2);
    text('Press Enter to Start', width/2 - 100 , height/2 + 50);
  } else {
    // Increment game2timer when game is running
    game2timer += deltaTime / 1000; // deltaTime is the time between frames in milliseconds, so we divide by 1000 to convert it to seconds
    
    // Display game screen
    background(255);
    
    // Display targets
    for (let target of targets) {
      target.display();
    }
    
    // Display shapes
    for (let shape of shapes) {
      shape.display();
      shape.update();
    }
    
    // Display game2score
    textSize(20);
    fill(0);
    text('game2score: ' + game2score, 20, 30);
    
    // Display game2timer
    textSize(20);
    fill(0);
    text('Time: ' + (gameTime - floor(game2timer)), 20, 60);
    
    // Check if game time is over
    if (game2timer >= gameTime) {
      game2Started
     = false; // Stop the game
      // Display endgame screen
      background(200);
      textSize(32);
      fill(0);
      text('Game Over', width/2 - 80, height/2 - 30);
      text('game2score: ' + game2score, width/2 - 60, height/2);
      text('Press Enter to Play Again', width/2 - 140, height/2 + 30);
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (!game2Started
  ) {
      // Start the game when Enter is pressed
      game2Started
     = true;
      game2timer = 0;
      game2score = 0; // Reset game2score
      shapes = []; // Clear shapes array
      generateShape(); // Generate initial shape
    } else if (game2timer >= gameTime) {
      // Restart the game when Enter is pressed after game over
      game2timer = 0;
      game2score = 0;
      shapes = [];
      game2Started
     = true;
      generateShape();
    }
  }
}

function mousePressed() {
  for (let shape of shapes) {
    if (shape.contains(mouseX, mouseY)) {
      shape.dragging = true;
      shape.offsetX = mouseX - shape.x;
      shape.offsetY = mouseY - shape.y;
    }
  }
}

function mouseReleased() {
  let droppedShape = null;
  for (let shape of shapes) {
    shape.dragging = false;
    let droppedAtCorrectTarget = false; // Flag to determine if dropped at correct target
    for (let target of targets) {
      if (target.contains(mouseX, mouseY) && target.type === shape.type) {
        shape.x = target.x;
        shape.y = target.y;
        shape.color = color(0, 255, 0); // Green if dropped in correct target
        game2score++;
        droppedShape = shape;
        droppedAtCorrectTarget = true; // Set to true if dropped at correct target
        break;
      }
    }
    if (!droppedAtCorrectTarget) {
      // Flash red briefly when dropped at the wrong target
      shape.flashRed = true;
      setTimeout(() => { shape.flashRed = false; }, 500); // Flash for 0.5 seconds
    }
  }

  // Remove the dropped shape from the shapes array
  if (droppedShape) {
    shapes = shapes.filter(shape => shape !== droppedShape);
    // Generate a new shape after despawning
    generateShape();
  }
}

function generateShape() {
  let randomType = random(['triangle', 'square', 'circle']);
  let randomColor = color(random(255), random(255), random(255));

  // Ensure the color is not in the red spectrum (avoiding red, orange, pink)
  while (red(randomColor) > 150 && green(randomColor) < 100 && blue(randomColor) < 100) {
    randomColor = color(random(255), random(255), random(255));
  }

  let newShape = new Shape(width - 100, height / 2, randomType, randomColor);
  
  let attempts = 0;
  const maxAttempts = 100; // Maximum number of attempts
  
  while (attempts < maxAttempts) {
    let overlapping = false;
    
    // Check for collision with existing shapes
    for (let shape of shapes) {
      if (collisionDetection(newShape, shape)) {
        overlapping = true;
        break;
      }
    }
    
    if (!overlapping) {
      // If there's no collision, add the new shape and exit the loop
      shapes.push(newShape);
      break;
    }
    
    // If there's a collision, generate a new shape
    newShape = new Shape(width - 100, height / 2, randomType, randomColor);
    attempts++;
  }
  
  if (attempts >= maxAttempts) {
    console.log("Max attempts reached. Unable to generate non-overlapping shape.");
  }
}

function collisionDetection(shape1, shape2) {
  // Simple collision detection for rectangle and rectangle
  return !(shape1.x + shape1.size / 2 < shape2.x - shape2.size / 2 || 
           shape1.x - shape1.size / 2 > shape2.x + shape2.size / 2 ||
           shape1.y + shape1.size / 2 < shape2.y - shape2.size / 2 ||
           shape1.y - shape1.size / 2 > shape2.y + shape2.size / 2);
}

class Shape {
  constructor(x, y, type, color) {
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;
    this.type = type;
    this.color = color;
    this.size = 50;
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.flashRed = false; // Flag to indicate if the shape should flash red
  }
  
  display() {
    if (this.flashRed) {
      fill(255, 0, 0); // Flash red if dropped at the wrong target
    } else {
      fill(this.color);
    }
    if (this.type === 'triangle') {
      triangle(this.x, this.y - this.size / 2, this.x + this.size / 2, this.y + this.size / 2, this.x - this.size / 2, this.y + this.size / 2);
    } else if (this.type === 'square') {
      rectMode(CENTER);
      rect(this.x, this.y, this.size, this.size);
    } else if (this.type === 'circle') {
      ellipse(this.x, this.y, this.size, this.size);
    }
  }
  
  update() {
    if (this.dragging) {
      this.x = mouseX - this.offsetX;
      this.y = mouseY - this.offsetY;
    }
  }
  
  contains(px, py) {
    return (px > this.x - this.size / 2 && px < this.x + this.size / 2 && py > this.y - this.size / 2 && py < this.y + this.size / 2);
  }
}

class Target {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.size = 50;
  }
  
  display() {
    noFill();
    stroke(0);
    strokeWeight(2);
    if (this.type === 'triangle') {
      triangle(this.x, this.y - this.size / 2, this.x + this.size / 2, this.y + this.size / 2, this.x - this.size / 2, this.y + this.size / 2);
    } else if (this.type === 'square') {
      rectMode(CENTER);
      rect(this.x, this.y, this.size, this.size);
    } else if (this.type === 'circle') {
      ellipse(this.x, this.y, this.size, this.size);
    }
  }
  
  contains(px, py) {
    return (px > this.x - this.size / 2 && px < this.x + this.size / 2 && py > this.y - this.size / 2 && py < this.y + this.size / 2);
  }
}