/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    

  }
  
  /* 
  Called in response to events.
  */
    function handleKeyDown(event) {
      if (event.which === KEY.UP) {
        snake.speedY = -5;
      }
      if (event.which === KEY.DOWN) {
        snake.speedY = 5;
      }
      if (event.which === KEY.S) {
        snake.speedY = 5;
      }
      if (event.which === KEY.W) {
        snake.speedY = -5
      }
    }
  
  

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function GameItem(elementId) {
    var gameItem = {};
    gameItem.id = elementId;
    gameItem.x = parseFloat($(elementId).css('left'));
    gameItem.y = parseFloat($(elementId).css('top'));
    gameItem.width = $(elementId).width();
    gameItem.height = $(elementId).height();
    gameItem.speedX = 0;
    gameItem.speedY = 0;
    return gameItem;
  }

  function startSnake() {
    snake.x = 160;
    snake.y = 20;
    $(snake.id).css("left", 160);
    $(snake.id).css("top", 20);
    var randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    snake.speedX = randomNum;
    var randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    snake.speedY = randomNum;
  }

  function moveObject(object) {
    object.x += object.speedX;
    object.y += object.speedY;
    $(object.id).css("left", object.x);
    $(object.id).css("top", object.y);
  }

  function wallCollision(object){
    if((object.y  < 0) || (object.y + $(object.id).height() > BOARD_HEIGHT)){
        return true;
      }
    if((object.x  < 0) || (object.x + $(object.id).width() > BOARD_WIDTH)){
         return true;
       }
  }
      
    function keepSnakeOnBoard(){
      var collided = wallCollision(snake);
      if(collided === true){
        snake.y -= snake.speedY;
      }
    }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
