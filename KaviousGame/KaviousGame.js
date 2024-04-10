
//add the path of any image here
function game2Preload(){
  
}

//when adding game setup ensure current infomation stays the same. 
function game2Setup() {
  background("white");
  currentActivity = 3;

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
function game2Draw(){
    background("green");
    text('Activity 2 goes here', 200, 200);
  
}