const points = [];
let dragPoint = null;
let colors = ['#FF0000', '#FFAA00', '#008FFF', '#0CFF00'];

const numPoints = 4;
const dragRadius = 40;
function game4Preload(){
}

function game4Setup() {
  background("white");
  currentActivity = 5;

  createCanvas(720, 400);
  for (let i = 0; i < numPoints; i++) {
    points.push(createVector((80 * i) + 80, 200));
  }

  faizanDetailsText.hide();
  kaviousDetailsText.hide();
  museveniDetailsText.hide();
  noahDetailsText.hide();

  homeButton.show();
  faizanButton.hide();
  kaviousButton.hide();
  museveniButton.hide();
  noahButton.hide();
}


//draw game propery (please make sure the name of function stays as is.)
function game4Draw(){
  background(220);
  stroke('#000');
 
  // Draw shapes
  fill('#FF0000');
  circle(80, 100, 40);
  fill('#FFAA00');
  square(140, 80, 40);
  fill('#008FFF');
  triangle(220, 120, 240, 80, 260, 120);
  fill('#0CFF00');
  circle(320, 100, 40);
  fill('#FF0000');

  // Draw draggable shapes
  for (let i = 0; i < points.length; i++) {
    if (i === 0) {
      fill(colors[2]); // Color matching the first shape
      triangle(points[i].x, points[i].y - dragRadius / 2,
               points[i].x - dragRadius / 2, points[i].y + dragRadius / 2,
               points[i].x + dragRadius / 2, points[i].y + dragRadius / 2);
       if (200 < points[i].x && points[i].x < 300) {
          text('I',346,300);
        }
    } else if (i === 1) {
      fill(colors[3]); // Color matching the second shape
      circle(points[i].x, points[i].y, dragRadius);
        if (points[i].x > 300) {
          text('I',350,300);
        }
    } else if (i === 2) {
      fill(colors[0]); // Color matching the third shape
      circle(points[i].x, points[i].y, dragRadius);
       if (points[i].x < 100) {
          text('I',342,300);
       }
    } else if (i === 3) {
      fill(colors[1]); // Color matching the fourth shape
      square(points[i].x - dragRadius / 2, points[i].y - dragRadius / 2, dragRadius);
       if (100 < points[i].x && points[i].x < 200) {
          text('I',338,300);
       }
    }
  }
  fill('#000');
  text("Shapes in the right order:      / IIII", 200, 300);
  text("IIII / IIII = A Win!!!", 280, 320)
}




function mousePressed() {
  for (let i = 0; i < points.length; i++) {
    const isPressed = mouseInShape(points[i], i, dragRadius);
    if (isPressed) {
      dragPoint = i;
      break;
    }
  }
}

function mouseDragged() {
  if (dragPoint !== null) {
    points[dragPoint].x = mouseX;
    points[dragPoint].y = mouseY;
  }
}

function mouseReleased() {
  dragPoint = null;
}

function mouseInShape(pos, index, radius) {
  switch (index) {
    case 0:
    case 3:
      return dist(mouseX, mouseY, pos.x, pos.y) < radius;
    case 1:
      return mouseX > pos.x - radius / 2 && mouseX < pos.x + radius / 2 && mouseY > pos.y - radius / 2 && mouseY < pos.y + radius / 2;
    case 2:
      return mouseX > pos.x - radius / 2 && mouseX < pos.x + radius / 2 && mouseY > pos.y - radius / 2 && mouseY < pos.y + radius / 2;
    default:
      return false;
  }
}
