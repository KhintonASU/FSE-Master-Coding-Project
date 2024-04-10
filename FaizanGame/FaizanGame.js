//This will be the main file that I am editing
let squareX = 200;
let squareY = 200;
let speedX = 2;
let speedY = 2;
let gameTimer = 0;
let squareColor = 'black';
let greenFrames = 0;

//add the path of any image here
function game1Preload(){

}

//when adding game setup ensure current infomation stays the same. 
function game1Setup() {
  background("white");
  currentActivity = 2;

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
function game1Draw(){
  background(255);
  moveSquare();
  drawSquare();
  gameTimer++;
  if (gameTimer > 10 * 30 ) {
      gameOver();
    }
}
function gameOver() {
let greenPercentage = (greenFrames / gameTimer) * 100;

  fill(0);
  textSize(32);
  text("Game Over", width/200, height/2.25);
  text("Green Percentage: " + nf(greenPercentage, 2, 2) + "%", width / 200, height / 2 + 20);
  noLoop();

}

function moveSquare() {
  squareX += speedX;
  squareY += speedY;
  if (squareX <= 0 || squareX >= width - 50) {
      speedX = random(-5, 5);
    }
    
    if (squareY <= 0 || squareY >= height - 50) {
      speedY = random(1, 5); 
    }
    
}

function drawSquare() {
  // Check if mouse is on the square
  if (mouseX > squareX && mouseX < squareX + 50 && mouseY > squareY && mouseY < squareY + 50) {
      squareColor = 'green';
      greenFrames++; 
  } else {
      squareColor = 'red'; 
  }

  fill(squareColor);
  rect(squareX, squareY, 50, 50);
}
