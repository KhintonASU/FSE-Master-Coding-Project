let welcomeText;
let homeButton, kaviousButton, museveniButton, noahButton, faizanButton;
let currentActivity = 0;
let bg;

function preload(){
  game1Preload();
  game2Preload();
  game3Preload();
  game4Preload();
}

function switchToMM(){
  background(220);
  currentActivity = 1;

  faizanButton.show();
  kaviousButton.show();
  museveniButton.show();
  noahButton.show();
  
}

function setup() {
  currentActivity = 0;
  bg = loadImage('assets/background-image-2.jpg');
  createCanvas(720, 400);

  
  // Welcome page
  welcomeText = createP("Welcome To Fine Motorskill Helper");
  welcomeText.position(120, 100);
  welcomeText.style('font-size', '36px');
  welcomeText.style('color', 'darkblue');

  // MainMenu button
  homeButton = createButton("Main Menu");
  homeButton.position(width / 2 - homeButton.width / 2, height / 2 + 50);
  homeButton.mousePressed(switchToMM);

  faizanButton = createButton('Follow The Outline Game');
  faizanButton.position(10, 50);
  faizanButton.mousePressed(faizanButtonPressed);
  faizanButton.mouseOver(faizanButtonHover);
  faizanButton.mouseOut(buttonOut);
  faizanButton.hide();
  
  kaviousButton = createButton('Drag and Drop Game');
  kaviousButton.position(10, 125);
  kaviousButton.mousePressed(kaviousButtonPressed);
  kaviousButton.mouseOver(kaviousButtonHover);
  kaviousButton.mouseOut(buttonOut)
  kaviousButton.hide();

  museveniButton = createButton('Typing Game');
  museveniButton.position(10, 200);
  museveniButton.mousePressed(museveniButtonPressed);
  museveniButton.mouseOver(museveniButtonHover);
  museveniButton.mouseOut(buttonOut);
  museveniButton.hide();

  noahButton = createButton('Stacking Objects Game');
  noahButton.position(10, 275);
  noahButton.mousePressed(noahButtonPressed);
  noahButton.mouseOver(noahButtonHover);
  noahButton.mouseOut(buttonOut);
  noahButton.hide();

}

function draw() {
  background(bg);
  switch(currentActivity){
    case 1: 
      MainMenu();
    break;
    case 2: 
      game1Draw();
    break;
    case 3:
      game2Draw();
    break;    
    case 4: 
      game3Draw();
    break;    
    case 5:
      game4Draw();
    break;
  }

}


function MainMenu(){
  currentActivity = 1;
  welcomeText.hide();
  homeButton.position(600,10);
  homeButton.hide();
  
  
  faizanButton.show();
  kaviousButton.show();
  museveniButton.show();
  noahButton.show();
}

function mousePressed () {
  switch(currentActivity){
    case 1:
      MainMenu();
    break;
    case 2:
      game1Draw();
    break;
    case 3:
      game2Draw();
    break;
    case 4:
      game3Draw();
    break;
    case 5:
      game4Draw();
    break;
  }
}


function faizanButtonHover() {
  // Change faizanButton's highlighted color style to teal
  faizanButton.style('background-color', 'rgba(0, 128, 128, 1)');
}

function kaviousButtonHover() {
  kaviousButton.style('background-color', 'rgba(0, 128, 128, 1)');
}

function museveniButtonHover() {
  museveniButton.style('background-color', 'rgba(0, 128, 128, 1)');
}

function noahButtonHover() {
  noahButton.style('background-color', 'rgba(0, 128, 128, 1)');
}

function buttonOut() {
  // Reset button's highlighted color style when mouse leaves
  faizanButton.style('background-color', ''); // Resets faizanButton's background color to default
  kaviousButton.style('background-color', ''); // Resets kaviousButton's background color to default
  museveniButton.style('background-color', ''); // Resets museveniButton's background color to default
  noahButton.style('background-color', ''); // Resets noahButton's background color to default
}

function faizanButtonPressed() {
  // Call the game1Setup function
  game1Setup();
}

function kaviousButtonPressed() {
  // Call the game2Setup function
  game2Setup();
}

function museveniButtonPressed() {
  // Call the game3Setup function
  game3Setup();
}

function noahButtonPressed() {
  // Call the game4Setup function
  game4Setup();
}