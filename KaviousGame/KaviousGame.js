let shapes = [];
let targets = [];
let score = 0;
let game2Started = false;
let timer = 0;
const gameTime = 20;

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

}

function game2Draw() {
  if (!game2Started) {
    game2StartTime();
  } else {
    timer += deltaTime / 1000;
    game2Screen();
    if (timer >= gameTime) {
      game2OverScreen();
    }
  }
}

function game2KeyPressed() {
  if (keyCode === ENTER) {
    if (!game2Started) {
      game2StartGamee();
    } else if (timer >= gameTime) {
      game2ResttartGamee();
    }
  }
}

function game2StartGamee() {
  game2Started = true;
  timer = 0;
  score = 0;
  shapes = [];
  game2GenerateShape();
}

function game2ResttartGamee() {
  timer = 0;
  score = 0;
  shapes = [];
  game2StartGamee();
}

function game2StartTime() {
  background(200);
  textSize(24);
  fill(0);
  text('INSTRUCTIONS:', width/2 - 100, height/2 - 100);
  text(' Drag as many shapes as possible to the matching target.', width/2 - 300, height/2 -  50);
  text('you have 20 seconds to complete this task.', width/2 - 200, height/2);
  text('Press Enter to Start', width/2 - 100 , height/2 + 50);
}

function game2Screen() {
  background(255);
  game2DisplayTarget();
  game2DisplayShapes();
  game2DisplayScore();
  game2DisplayTimer();
}

function game2OverScreen() {
  background(200);
  textSize(32);
  fill(0);
  text('Game Over', width/2 - 80, height/2 - 30);
  text('Score: ' + score, width/2 - 60, height/2);
  text('Press Enter to Play Again', width/2 - 140, height/2 + 30);
}

function game2DisplayTarget() {
  for (let target of targets) {
    target.display();
  }
}

function game2DisplayShapes() {
  for (let shape of shapes) {
    shape.display();
    shape.update();
  }
}

function game2DisplayScore() {
  textSize(20);
  fill(0);
  text('Score: ' + score, 20, 30);
}

function game2DisplayTimer() {
  textSize(20);
  fill(0);
  text('Time: ' + (gameTime - floor(timer)), 20, 60);
}

function game2MousePressed() {
  for (let shape of shapes) {
    if (shape.contains(mouseX, mouseY)) {
      shape.dragging = true;
      shape.offsetX = mouseX - shape.x;
      shape.offsetY = mouseY - shape.y;
    }
  }
}

function game2MouseReleased() {
  let game2DroppedShape = null;
  let droppedOutsideTarget = true; // Assume shape dropped outside target initially
  for (let shape of shapes) {
    shape.dragging = false;
    for (let target of targets) {
      if (target.contains(mouseX, mouseY) && target.type === shape.type) {
        shape.x = target.x;
        shape.y = target.y;
        shape.color = color(0, 255, 0);
        score++;
        game2DroppedShape = shape;
        droppedOutsideTarget = false; // Shape dropped inside target
        break;
      }
    }
    if (droppedOutsideTarget) {
      // Save the original color
      const originalColor = shape.color;
      // Change the color to red
      shape.color = color(255, 0, 0);
      // Flashing effect: Change back to original color after a short delay
      setTimeout(() => {
        shape.color = originalColor; // Revert back to original color
        // Clear the timeout and revert the color back again after a short delay
        setTimeout(() => {
          shape.color = originalColor; // Revert back to original color again
        }, 250); // Delay before reverting to original color again
      }, 500); // Flashing duration in milliseconds (e.g., 500 ms = 0.5 seconds)
    }
  }
  if (game2DroppedShape) {
    shapes = shapes.filter(shape => shape !== game2DroppedShape);
    game2GenerateShape();
  }
}


function game2GenerateShape() {
  let randomType = random(['triangle', 'square', 'circle']);
  let randomColor = color(random(255), random(255), random(255));
  let newShape = new Shape(width - 100, height / 2, randomType, randomColor);
  shapes.push(newShape);
}

class Shape {
  constructor(x, y, type, color) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.color = color;
    this.size = 50;
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }
  
  display() {
    fill(this.color);
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
