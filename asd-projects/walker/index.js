/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    W: 87,
    A: 65,
    S: 83,
    D: 68,
  }

  var WALKER_WIDTH = 50;
  var WALKER_HEIGHT = 90;

  var DOG_WIDTH = 60;
  var DOG_HEIGHT = 80;

  var walkerSpeedX = 0;
  var walkerSpeedY = 0;
  var walkerPositionX = 0;
  var walkerPositionY = 0;
  

  var dogSpeedX = 0;
  var dogSpeedY = 0;
  var dogPositionX = 600;
  var dogPositionY = 0;
  
  
  // Game Item Objects
  var girl = {};
  girl.topY = walkerPositionY;
  girl.leftX = walkerPositionX;
  girl.bottomY = walkerPositionY + WALKER_HEIGHT;
  girl.rightX = walkerPositionX + WALKER_WIDTH;

  var doggo = {};
  doggo.topY = dogPositionY;
  doggo.leftX = dogPositionX;
  doggo.bottomY = dogPositionY + DOG_HEIGHT;
  doggo.rightX = dogPositionX + DOG_WIDTH;
 


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);  
  $(document).on('keyup', handleKeyUp);                        // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionWalker();
    updateGirl();
    redrawWalker();
    repositionDog();
    updateDoggo();
    redrawDog();
    didCollide();

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.LEFT){
      walkerSpeedX = -5;      
    }
    if(event.which === KEY.RIGHT){
      walkerSpeedX = 5;
    } 
    if(event.which === KEY.UP){
      walkerSpeedY = -5;
    }
    
    if(event.which === KEY.DOWN){
      walkerSpeedY = 5;
      
    }
    if(event.which === KEY.A){
      dogSpeedX = -5;
    }
    if(event.which === KEY.D){
      dogSpeedX = 5;
    }
    if(event.which === KEY.S){
      dogSpeedY = 5;
    }
    if(event.which === KEY.W){
      dogSpeedY = -5
    }

  }
  function handleKeyUp(event) {
    if(event.which === KEY.LEFT){
      walkerSpeedX = 0;
    }
    if(event.which === KEY.RIGHT){
      walkerSpeedX = 0;
    }
    if(event.which === KEY.UP){
      walkerSpeedY = 0;
    }
    if(event.which === KEY.DOWN){
      walkerSpeedY = 0;
    }
    if(event.which === KEY.A){
      dogSpeedX = 0;
    }
    if(event.which === KEY.D){
      dogSpeedX = 0
    }
    if(event.which === KEY.W){
      dogSpeedY = 0;
    }
    if(event.which === KEY.S){
      dogSpeedY = 0;
    }

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionWalker(){
    walkerPositionX += walkerSpeedX; //update position of walker on x axis
    //My attempt at making the walker stay in the box on the x axis
    if(walkerPositionX <= 0){
      walkerPositionX = 0;
    }else if(walkerPositionX >= 600){
      walkerPositionX = 600;
    }
    walkerPositionY += walkerSpeedY; //update position of walker om y axis
    //My attempt at making the walker stay in the box on the y axis
    if(walkerPositionY <= 0){
      walkerPositionY = 0;
    }else if(walkerPositionY >= 340){
      walkerPositionY = 340;
    }

  }
  function repositionDog(){
    dogPositionX += dogSpeedX; //update position of dog on x axis
    //keeping the dog in the box on the x axis
    if(dogPositionX <= 0){
      dogPositionX = 0;
    }else if(dogPositionX >= 610){
      dogPositionX = 610;
    }
    dogPositionY += dogSpeedY; //update position of dog on y axis
    //Keeping the dog in the box on the y axis
    if(dogPositionY <= 0){
      dogPositionY = 0;
    }else if(dogPositionY >= 360){
      dogPositionY = 360;
    }

  }
  function updateGirl(){
    girl.topY = walkerPositionY;
    girl.leftX = walkerPositionX;
    girl.bottomY = walkerPositionY + WALKER_HEIGHT;
    girl.rightX = walkerPositionX + WALKER_WIDTH;

  }
  function updateDoggo(){
    doggo.topY = dogPositionY;
    doggo.leftX = dogPositionX;
    doggo.bottomY = dogPositionY + DOG_HEIGHT;
    doggo.rightX = dogPositionX + DOG_WIDTH;
  }

  function redrawWalker(){
    $("#walker").css("left", walkerPositionX)
                .css("top", walkerPositionY);

  }
  function redrawDog(){
    $("#dog").css("left", dogPositionX)
             .css("top", dogPositionY);

  }
  var collided = false;

  function resetFlag(){
    collided = false;
  }
  function didCollide(){
    if(collided === false){
      detectCollision();
    }
  }

  function detectCollision(){
    if((doggo.rightX >= girl.leftX) &&
      (doggo.leftX <= girl.rightX) &&
      (doggo.bottomY >= girl.topY) &&
      (doggo.topY <= girl.bottomY) ){
        collided = true;
        setTimeout(resetFlag, 3000);
        changeColors();
    }
  }
  
  
  var isIt = "playerRight";
  function changeColors(){
    
      if(isIt === "playerRight"){
        $("#walker").css("border-color", "bisque");
        $("#dog").css("border-color", "red");
        isIt = "playerLeft";

      }else if(isIt === "playerLeft"){
        $("#dog").css("border-color", "aqua");
        $("#walker").css("border-color", "red");
        isIt = "playerRight";
      }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
} 

