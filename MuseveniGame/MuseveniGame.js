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
]; // replace with your letters
let currentLetter = "";
let feedbackMessage = "";
const limit = 20.0;
let game3score = 0;
let game3startTime;
let game3Running = false; // Variable to track if the game is running
let game3Over = false; // Variable to track if the game is over
let game3EndTime; // Variable to track the time when the game ended
let game3waitTime = 5; // Change wait time to 5 seconds
let game3waitStartTime; // Variable to track the time when the waiting period started

function game3Preload() {}

//when adding game setup ensure current infomation stays the same.
function game3Setup() {
  currentActivity = 4;
  textAlign(CENTER, CENTER);
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
function game3Draw() {
  if (!game3Running) {
    background(255, 204, 0); // Set background color to yellow
    textSize(20);
    fill(0); // Set text color to white
    text(
      "Instructions: See how many letters you can type before the time runs out.",
      width / 2,
      height / 2 - 50
    );
    textSize(32);
    fill(0); // Set text color to white
    if (game3Over) {
      text(
        "Game Over! Your final score is: " + game3score,
        width / 2,
        height / 2
      );
      if (Math.floor(Date.now() / 1000) - game3EndTime < game3waitTime) {
        let remainingTime =
          game3waitTime - (Math.floor(Date.now() / 1000) - game3EndTime);
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
  let timePassed = currentTime - game3startTime; // Calculate time passed in seconds

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
    text("Score: " + game3score, width / 2, 250);
  }

  if (timePassed >= limit) {
    feedbackMessage =
      "Time's up! Game over. Your final score is: " + game3score;
    game3Running = false;
    game3Over = true;
    game3EndTime = Math.floor(Date.now() / 1000); // Record the time when the game ended
  }
}

function keyPressed() {
  if (!game3Running || game3Over) {
    if (
      gameOver &&
      Math.floor(Date.now() / 1000) - game3EndTime < game3waitTime
    ) {
      // If the game is over and less than waitTime seconds have passed since it ended, do nothing
      return;
    }
    // Restart the game
    game3Running = true;
    game3Over = false;
    game3score = 0;
    game3startTime = Math.floor(Date.now() / 1000);
    selectRandomLetter();
    feedbackMessage = "";
  } else {
    if (key === currentLetter) {
      feedbackMessage = "Correct";
      game3score++;
      selectRandomLetter();
    } else {
      feedbackMessage = "Wrong key pressed. Try again!";
    }
  }
}

function selectRandomLetter() {
  currentLetter = random(letters);
}
