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
let currentLetter = ""; // Variable to store the current letter
let feedbackMessage = ""; // Variable to store feedback message
//add the path of any image here
function game3Preload() {}

//when adding game setup ensure current infomation stays the same.
function game3Setup() {
  background("white");
  currentActivity = 4;
  textSize(32);
  selectRandomLetter();
  homeButton.show();
  faizanButton.hide();
  kaviousButton.hide();
  museveniButton.hide();
  noahButton.hide();
}

//draw game propery (please make sure the name of function stays as is.)
function game3Draw() {
  background(220);
  textSize(32);
  text("Press the key: " + currentLetter, 50, 100); // Display the current random letter
  text(feedbackMessage, 50, 200);
}
function keyPressed() {
  if (key === currentLetter) {
    feedbackMessage = "Correct";
    selectRandomLetter(); // Select a new random letter
  } else {
    feedbackMessage = "Wrong key pressed. Try again!";
  }
}
function selectRandomLetter() {
  currentLetter = random(letters); // Select a random letter from the array
}
