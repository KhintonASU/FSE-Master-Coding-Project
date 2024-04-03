let letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let currentLetter = "";
let feedbackMessage = "";
const limit = 10.0;
let score = 0;
let startTime;
let gameRunning = false; // Variable to track if the game is running
let gameOver = false; // Variable to track if the game is over
let gameEndTime; // Variable to track the time when the game ended
let waitTime = 5; // Change wait time to 5 seconds
let waitStartTime; // Variable to track the time when the waiting period started

function setup() {
  createCanvas(720, 400);
  textAlign(CENTER, CENTER);
}

function draw() {
  if (!gameRunning) {
    background(255, 204, 0); // Set background color to yellow
    textSize(32);
    fill(255); // Set text color to white
    if (gameOver) {
      text("Game Over! Your final score is: " + score, width / 2, height / 2);
      if (Math.floor(Date.now() / 1000) - gameEndTime < waitTime) {
        let remainingTime =
          waitTime - (Math.floor(Date.now() / 1000) - gameEndTime);
        text(
          "Please wait " + remainingTime + " seconds to play again",
          width / 2,
          height / 2 + 50
        );
      } else {
        text("Press any key to play again", width / 2, height / 2 + 50);
      }
    } else {
      text("Press any key to start the game", width / 2, height / 2);
    }
    return; // Exit draw loop if the game is not running
  }

  let currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  let timePassed = currentTime - startTime; // Calculate time passed in seconds

  background(0, 102, 204); // Set background color to blue
  textSize(24);
  fill(255); // Set text color to white
  text("Time Left: " + Math.max(limit - timePassed, 0) + " sec", width / 2, 50);
  textSize(32);
  fill(255, 204, 0); // Set text color to yellow
  text("Press the key: " + currentLetter, width / 2, 150);
  fill(255); // Set text color to white
  text(feedbackMessage, width / 2, 200);
  if (!feedbackMessage) {
    // Show score only if feedbackMessage is empty
    text("Score: " + score, width / 2, 250);
  }

  if (timePassed >= limit) {
    feedbackMessage = "Time's up! Game over. Your final score is: " + score;
    gameRunning = false;
    gameOver = true;
    gameEndTime = Math.floor(Date.now() / 1000); // Record the time when the game ended
  }
}

function keyPressed() {
  if (!gameRunning || gameOver) {
    if (gameOver && Math.floor(Date.now() / 1000) - gameEndTime < waitTime) {
      // If the game is over and less than waitTime seconds have passed since it ended, do nothing
      return;
    }
    // Restart the game
    gameRunning = true;
    gameOver = false;
    score = 0;
    startTime = Math.floor(Date.now() / 1000);
    selectRandomLetter();
    feedbackMessage = "";
  } else {
    if (key === currentLetter) {
      feedbackMessage = "Correct";
      score++;
      selectRandomLetter();
    } else {
      feedbackMessage = "Wrong key pressed. Try again!";
    }
  }
}

function selectRandomLetter() {
  currentLetter = random(letters);
}
