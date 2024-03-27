let welcomeText;
let homeButton, kaviousButton, museveniButton, noahButton, faizanButton;
let currentActivity = 0;


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
  createCanvas(720, 400);

  
  // Welcome page
  welcomeText = createP("Welcome To Motorskill Helper");
  welcomeText.position(120, 100);
  welcomeText.style('font-size', '36px');
  welcomeText.style('color', 'darkblue');

  // MainMenu button
  homeButton = createButton("Main Menu");
  homeButton.position(width / 2 - homeButton.width / 2, height / 2 + 50);
  homeButton.mousePressed(switchToMM);

  faizanButton = createButton('Follow The Outline Game');
  faizanButton.position(10, 50);
  faizanButton.mousePressed(game1Setup);
  faizanButton.hide();
  
  kaviousButton = createButton('Drag and Drop Game');
  kaviousButton.position(10, 75);
  kaviousButton.mousePressed(game2Setup);
  kaviousButton.hide();

  museveniButton = createButton('Typing Game');
  museveniButton.position(10, 100);
  museveniButton.mousePressed(game3Setup);
  museveniButton.hide();

  noahButton = createButton('Stacking Objects Game');
  noahButton.position(10, 125);
  noahButton.mousePressed(game4Setup);
  noahButton.hide();

}

function draw() {
  background(220);
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