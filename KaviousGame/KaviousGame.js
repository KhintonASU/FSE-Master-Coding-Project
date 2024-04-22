let shapes = [];
let targets = [];
let score = 0;
let startTime;
let game2Running = false; // Variable to track if the game is running
let game2Over = false; // Variable to track if the game is over
let game2EndTime; // Variable to track the time when the game ended
let waitTime = 5; // Change wait time to 5 seconds
let waitStartTime; // Variable to track the time when the waiting period started

//add the path of any image here
function game2Preload(){
  
}

//when adding game setup ensure current infomation stays the same. 
function game2Setup() {
  currentActivity = 3;
  
  // Create targets on the left side
  targets.push(new Target(50, height / 2, 'triangle'));
  targets.push(new Target(50, height / 2 + 100, 'square'));
  targets.push(new Target(50, height / 2 - 100, 'circle'));

// Generate initial shapes
  generateShape();

  homeButton.show();
  faizanButton.hide();
  kaviousButton.hide();
  museveniButton.hide();
  noahButton.hide();

  faizanDetailsText.hide()
  kaviousDetailsText.hide();
  museveniDetailsText.hide();
  noahDetailsText.hide();
}


//draw game propery (please make sure the name of function stays as is.)
function game2Draw(){
  if (!game2Running) {
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
  
  // Display score
  textSize(20);
  fill(0);
  text('Score: ' + score, 20, 30);
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
        score++;
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
