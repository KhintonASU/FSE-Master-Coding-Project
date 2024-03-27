
//add the path of any image here
function game1Preload(){

}

//when adding game setup ensure current infomation stays the same. 
function game1Setup() {
  background("white");
  currentActivity = 2;

  homeButton.show();
  faizanButton.hide();
  kaviousButton.hide();
  museveniButton.hide();
  noahButton.hide();

}

//draw game propery (please make sure the name of function stays as is.)
function game1Draw(){
    background("red");
    text('Activity 1 goes here', 200, 200);
}