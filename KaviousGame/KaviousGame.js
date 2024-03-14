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
  menuButton.show();
  faizanGameButton.show();
  kaviousgameButton.show();
  musevenigameButton.show();
  noahgameButton.show();
}

function setup() {
  createCanvas(400, 400);
  background(220);
  menuButton = createButton('Home Page');
  menuButton.position(0, 0);
  menuButton.mousePressed(switchToMM);
  menuButton.hide();
  
  faizanGameButton = createButton('Follow The Outline Game');
  faizanGameButton.position(10, 50);;
  faizanGameButton.show();
  
  kaviousgameButton = createButton('Drag and Drop Game');
  kaviousgameButton.position(10, 100);;
  kaviousgameButton.show();
  
  musevenigameButton = createButton('Typing Game');
  musevenigameButton.position(10, 150);;
  musevenigameButton.show();
  
  noahgameButton = createButton('Stacking Objects Game');
  noahgameButton.position(10, 200);;
  noahgameButton.show();
}

function mainMenu(){
  background(220);
  
  fill('black');
  text('Click an activity', 200, 200);
}
