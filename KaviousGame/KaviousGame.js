let targets = [];
let shapes = [];
let shapeSize = 50;
let dragShape = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

//add the path of any image here
function game2Preload(){
  
}

//when adding game setup ensure current infomation stays the same. 
function game2Setup() {
  currentActivity = 3;

// Create targets
targets.push(new Target(100, 100, "circle"));
targets.push(new Target(100, 200, "square"));
targets.push(new Target(100, 300, "triangle"));

// Generate initial shapes
generateShapes();

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


//draw game propery (please make sure the name of function stays as is.)
function game2Draw(){
  for (let target of targets) {
    target.display();
  }
  
  // Display shapes
  for (let shape of shapes) {
    shape.display();
  }
  
  // Dragging shape
  if (dragShape !== null) {
    dragShape.x = mouseX - dragOffsetX;
    dragShape.y = mouseY - dragOffsetY;
  }
}

function mousePressed() {
  for (let i = shapes.length - 1; i >= 0; i--) {
    if (shapes[i].contains(mouseX, mouseY)) {
      dragShape = shapes[i];
      dragOffsetX = mouseX - shapes[i].x;
      dragOffsetY = mouseY - shapes[i].y;
      break;
    }
  }
}

function mouseReleased() {
  if (dragShape !== null) {
    let droppedOnTarget = false;
    for (let target of targets) {
      if (dragShape.intersects(target) && dragShape.type === target.type) {
        shapes.splice(shapes.indexOf(dragShape), 1);
        generateShape(); // Generate a new shape independently
        droppedOnTarget = true;
        break;
      }
    }
    
    if (!droppedOnTarget) {
      dragShape.flash();
      dragShape.x = dragShape.originalX;
      dragShape.y = dragShape.originalY;
    }
    
    dragShape = null;
  }
}

function generateShape() {
  let x, y;
  let type = random(["circle", "square", "triangle"]);
  if (type === "circle") {
    x = 500; // X-axis position for circle
    y = random(50, 350); // Random y-axis position for circle within the specified range
  } else {
    x = 600; // X-axis position for square
    y = random(50, 350 ); // Random y-axis position for square within the specified range
  }
  

  // Create a new shape
  let newShape = new Shape(x, y, type);
  
  // Check if the newly generated shape intersects with existing shapes or if it's too close to them
  while (shapeIntersects(newShape) || tooCloseToOtherShape(newShape)) {
    if (type === "circle") {
      newShape.y = random(50, 350); // Regenerate y-axis position for circle within the specified range
    } else {
      newShape.y = random(50, 350); // Regenerate y-axis position for square within the specified range
    }
  }
  
  // Add the newly generated shape to the shapes array
  shapes.push(newShape);
}

function generateShapes() {
  shapes = []; // Clear existing shapes
  generateShape(); // Generate a single shape
  generateShape(); // Generate another shape
}

function shapeIntersects(newShape) {
  // Check if the newly generated shape intersects with existing shapes
  for (let shape of shapes) {
    if (newShape.intersects(shape)) {
      return true;
    }
  }
  return false;
}

function tooCloseToOtherShape(newShape) {
  // Check if the newly generated shape is too close to existing shapes
  for (let shape of shapes) {
    if (dist(newShape.x, newShape.y, shape.x, shape.y) < shapeSize * 1.5) {
      return true;
    }
  }
  return false;
}

class Shape {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.type = type;
    this.color = color(random(0, 175), random(0, 255), random(0, 255));

  }

  display() {
    fill(this.color);
    noStroke();
    if (this.type === "circle") {
      ellipse(this.x, this.y, shapeSize, shapeSize);
    } else if (this.type === "square") {
      rectMode(CENTER);
      rect(this.x, this.y, shapeSize, shapeSize);
    }
  }
  
  contains(px, py) {
    if (this.type === "circle") {
      return dist(px, py, this.x, this.y) < shapeSize / 2;
    } else if (this.type === "square") {
      return px > this.x - shapeSize / 2 && px < this.x + shapeSize / 2 && py > this.y - shapeSize / 2 && py < this.y + shapeSize / 2;
    }
  }
  
  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < shapeSize / 2;
  }
  
  flash() {
    this.color = color(255, 0, 0);
    setTimeout(() => {
      this.color = color(random(0, 175), random(0, 255), random(0, 255));
    }, 500);
  }
}

class Target {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  display() {
    noFill();
    stroke(0);
    strokeWeight(2);
    if (this.type === "circle") {
      ellipse(this.x, this.y, shapeSize, shapeSize);
    } else if (this.type === "square") {
      rectMode(CENTER);
      rect(this.x, this.y, shapeSize, shapeSize);
    }
  }
}


