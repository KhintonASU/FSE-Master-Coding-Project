//This will be the main file that I am editing
let squareX = 200;
let squareY = 200;
let speedX = 2;
let speedY = 2;
let gameTimer = 0;
let squareColor = 'black';
let greenFrames = 0;
let gameOverFlag = false;
//Add a background color
//add the path of any image here
function game1Preload(){

}

//when adding game setup ensure current infomation stays the same. 
function game1Setup() {
  background("black");
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
function game1Draw() {
  background(255, 204, 0);
  //color(255, 204, 0);

  if (!gameOverFlag) {
    moveSquare1();
    drawSquare1();
    gameTimer++;

    if (gameTimer > 10 * 30) {
      game1Over();
    }
  }

  if (gameOverFlag) {
    // Game over logic
    let greenPercentage = (greenFrames / gameTimer) * 100;
    fill(0);
    textSize(32);
    text("Game Over", width / 200, height / 2.25);
    text(
      "Green Percentage: " + nf(greenPercentage, 2, 2) + "%",
      width / 200,
      height / 2 + 20
    );
    text("Click To Restart", width / 200, height / 2 + 60);

    // Check for mouse click

  }
}


function restartGame1() {


    gameTimer = 0;
    greenFrames = 0;
    squareX = 200;
    squareY = 200;
    speedX = 2;
    speedY = 2;
    gameOverFlag = false;
    loop(); // Restart the game loop


}
function game1Over() {
let greenPercentage = (greenFrames / gameTimer) * 100;

  fill(0);
  textSize(32);
  text("Game Over", width/200, height/2.25);
  text("Green Percentage: " + nf(greenPercentage, 2, 2) + "%", width / 200, height / 2 + 20);
  text("Click To Restart", width/200, height/2 + 60);
  noLoop();
  gameOverFlag = true;
}


function moveSquare1() {
  squareX += speedX;
  squareY += speedY;

  // Randomly change speed every 60 frames
  if (gameTimer % 60 == 0) {
    speedX = random(-5, 5);
    speedY = random(-5, 5);
  }

  // Bounce off edges
  if (squareX <= 0 || squareX >= width - 50) {
    speedX = -speedX; 
  }

  if (squareY <= 0 || squareY >= height - 50) {
    speedY = -speedY;
  }

}
function drawSquare1() {
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

function mouseClicked() {  
  if (gameOverFlag) {
    restartGame1();
  }
}