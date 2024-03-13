let currentActivity = 0;
let menuButton, faizanGameButton, kaviousgameButton, musevenigameButton, noahgameButton;

/***** 
  * If you want to load images or sounds into your application,
  * try using preload()
  * https://p5js.org/reference/#/p5/preload
  *****/
function preload(){
  FaizanGamePreload();
  KaviousGamePreload();
  MuseveniGamePreload();
  NaohGamePreload();
}

function switchToMM(){
  background(220);
  currentActivity = 0;
  
  // Hide the home page button, show the activity buttons
  menuButton.hide();
  game1Button.show();
  game2Button.show();
  game3Button.show();
  game4Button.show();
}

function setup() {
  createCanvas(400, 400);
  background(220);
  menuButton = createButton('Home Page');
  menuButton.position(0, 0);
  menuButton.mousePressed(switchToMM);
  menuButton.hide();
  
  faizanGameButton = createButton('Follow The Outline Game');
  faizanGameButton.position(10, 50);
  faizanGameButton.mousePressed(game1Setup);
  faizanGameButton.show();
  
  kaviousgameButton = createButton('Drag and Drop Game');
  kaviousgameButton.position(10, 100);
  kaviousgameButton.mousePressed(game2Setup);
  kaviousgameButton.show();
  
  musevenigameButton = createButton('Typing Game');
  musevenigameButton.position(10, 150);
  musevenigameButton.mousePressed(game3Setup);
  musevenigameButton.show();
  
  noahgameButton = createButton('Stacking Objects Game');
  noahgameButton.position(10, 200);
  noahgameButton.mousePressed(game4Setup);
  noahgameButton.show();
}


function draw() {  
  switch(currentActivity){
    case 0: 
      mainMenu();
      break;
    case 1: 
      game1Draw();
      break;
    case 2: 
      game2Draw();
      break;
    case 3: 
      game3Draw();
      break;
    case 4: 
      game4Draw();
      break;
  }
}

function mainMenu(){
  background(220);
  
  fill('black');
  text('Click an activity', 200, 200);
}

/*****
* mousePressed() is a reserved function that is called whenever
* the user presses the mouse button in the application.
*****/
function mousePressed(){
  // Only game 4 uses the mousePressed function, but the switch statement
  // makes it easy to add the mousePressed functionality for other games.
  switch(currentActivity){
    case 2: 
      game2MousePressed();
      break;
    case 4: 
      game4MousePressed();
      break;
  }
}