let welcomeText;
let homeButton, kaviousgameButton, musevenigameButton, noahgameButton;
let menuButton;
let faizangameButton;

function setup() {
  createCanvas(720, 400);

  // Welcome page
  welcomeText = createP("Welcome To Motorskill Helper");
  welcomeText.position(width / 2 - welcomeText.width / 2, height / 2 - welcomeText.height / 2);

  // MainMenu button
  homeButton = createButton("Main Menu");
  homeButton.position(width / 2 - homeButton.width / 2, height / 2 + 50);
  homeButton.mousePressed(goToMainMenu);

}

function draw() {
  background(220);
}

function goToMainMenu() {
  welcomeText.remove();
  homeButton.remove();
  
  faizangameButton = createButton('Follow The Outline Game');
  faizangameButton.position(10, 50);
  faizangameButton.mousePressed(goToFaizanGame);

  kaviousgameButton = createButton('Drag and Drop Game');
  kaviousgameButton.position(10, 75);
  kaviousgameButton.mousePressed(goToKaviousGame)
 
  musevenigameButton = createButton('Typing Game');
  musevenigameButton.position(10, 100);
  musevenigameButton.mousePressed(goToMuseveniGame)
  
  noahgameButton = createButton('Stacking Objects Game');
  noahgameButton.position(10, 125);
  noahgameButton.mousePressed(goToNoahGame)
}

function goToFaizanGame() {
  // For now, let's just remove the home page elements
  faizangameButton.remove();
  kaviousgameButton.remove();
  musevenigameButton.remove();
  noahgameButton.remove();

  homeButton = createButton("Main Menu");
  homeButton.position(630, 0);
  homeButton.mousePressed(goToMainMenu);
}

function goToKaviousGame() {
  // For now, let's just remove the home page elements
  faizangameButton.remove();
  kaviousgameButton.remove();
  musevenigameButton.remove();
  noahgameButton.remove();

  homeButton = createButton("Main Menu");
  homeButton.position(630, 0);
  homeButton.mousePressed(goToMainMenu);
}

function goToMuseveniGame() {
  // For now, let's just remove the home page elements
  faizangameButton.remove();
  kaviousgameButton.remove();
  musevenigameButton.remove();
  noahgameButton.remove();

  homeButton = createButton("Main Menu");
  homeButton.position(630, 0);
  homeButton.mousePressed(goToMainMenu);
}

function goToNoahGame() {
  // For now, let's just remove the home page elements
  faizangameButton.remove();
  kaviousgameButton.remove();
  musevenigameButton.remove();
  noahgameButton.remove();

  homeButton = createButton("Main Menu");
  homeButton.position(630, 0);
  homeButton.mousePressed(goToMainMenu);
}