/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const snakeHead = snake[0];
  const KEY = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        W: 87,
        A: 65,
        S: 83,
        D: 68,
  }
  

  // Game Item Objects
  var apple = GameItem("#apple");
  var snake = GameItem("#snake");

 //Other variables
  var score = 0;
  var randomSquareX = Math.floor(Math.random() * (BOARD_WIDTH - apple.width) / apple.width) * apple.width;
  var randomSquareY = Math.floor(Math.random() * (BOARD_HEIGHT - apple.height) / apple.height) * apple.height;


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
    startSnake();
    placeApple();

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
      if(event.which === KEY.A){
        snakeSpeedX = -5;
      }
      if(event.which === KEY.D){
        snakeSpeedX = 5;
      }
      if(event.which === KEY.S){
        snakeSpeedY = 5;
      }
      if(event.which === KEY.W){
        snakeSpeedY = -5
      }
  
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
  function placeApple(){
    apple.x = randomSquareX;
    apple.y = randomSquareY;
    for(var i = 0; i < snake.length; i++){
      if(apple.x === snake[i].x && apple.y === snake[i].y)
        placeApple();
    }

  }

  function handleSnake(){
    
    if(snakeHead.x < 0){
      startBall();
    }else if(ball.x + $(ball.id).width() > BOARD_WIDTH){
      scorePlayer2 +=1;
      $("#scorePlayer2").text(scorePlayer2);
      startBall();
    }
  function moveObject(object) {
    object.x += object.speedX;
    object.y += object.speedY;
    $(object.id).css("left", object.x);
    $(object.id).css("top", object.y);
  }

  function wallCollision(){
    if((snake[0].y  < 0) || (snake[0].y + $(snake.id).height() > BOARD_HEIGHT)){
        endGame();
      }
    if((snake[0].x  < 0) || (snake[0].x + $(snake.id).width() > BOARD_WIDTH)){
         endGame();
       }
  }
      
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
