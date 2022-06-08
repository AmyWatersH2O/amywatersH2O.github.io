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
  var walker = {};
  walker.topY = walkerPositionY;
  walker.leftX = walkerPositionX;
  walker.bottomY = walkerPositionY + WALKER_HEIGHT;
  walker.rightX = walkerPositionX + WALKER_WIDTH;

  var dog = {};
  dog.topY = dogPositionY;
  dog.leftX = dogPositionX;
  dog.bottomY = dogPositionY + DOG_HEIGHT;
  dog.rightX = dogPositionX + DOG_WIDTH;
 

  var walkerSpeedX = 0;
  var walkerSpeedY = 0;
  var walkerPositionX = 0;
  var walkerPositionY = 0;
  var WALKER_WIDTH = 50;
  var WALKER_HEIGHT = 90;

  var dogSpeedX = 0;
  var dogSpeedY = 0;
  var dogPositionX = 0;
  var dogPositionY = 0;
  var DOG_WIDTH = 60;
  var DOG_HEIGHT = 80;
  
  var walkerColor = $("walker").css("border-color");
  var dogColor = $("dog").css("border-color");
  
  $('#walker').css('border-color', dogColor);
  walkerColor = dogColor;

  $('#dog').css('border-color', walkerColor);
  dogColor = walkerColor;

  // Game Item Objects


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
    redrawWalker();
    repositionDog();
    redrawDog();
    detectCollision();

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
    }else if(dog.rightX >= 660){
      dog.rightX = 660;
    }
    dogPositionY += dogSpeedY; //update position of dog on y axis
    //Keeping the dog in the box on the y axis
    if(dogPositionY <= 0){
      dogPositionY = 0;
    }else if(dog.bottomY >= 440){
      dog.bottomY = 440;
    }

  }
  function redrawWalker(){
    $("#walker").css("left", walkerPositionX)
                .css("top", walkerPositionY);

  }
  function redrawDog(){
    $("#dog").css("left", dogPositionX)
             .css("top", dogPositionY);

  }
  function detectCollision(){
    if((dog.rightX > walker.leftX)  &&
      (dog.leftX < walker.rightX) &&
      (dog.bottomY > walker.topY) &&
      (dog.topY < walker.bottomY) )
    {changeColors();
    }
  }
  function changeColors(){
      
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
} 

