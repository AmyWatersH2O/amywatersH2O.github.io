/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  var frame_rate = 7;
  var frames_per_second_interval = 1000 / frame_rate;

  // Constant Variables

  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const snake = [];
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
  var snakeHead = GameItem("#snake");
  snake.push(snakeHead);

  //Other variables
  var score = 0;


  // one-time setup
  var interval = setInterval(newFrame, frames_per_second_interval);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);  // change 'eventType' to the type of event you want to handle
  placeSnakeHead();
  placeApple();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveSnake();
    eatsApple();
    checkForCollisions();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      snakeHead.speedY = -20;
      snakeHead.speedX = 0;
    }
    if (event.which === KEY.DOWN) {
      snakeHead.speedY = 20;
      snakeHead.speedX = 0;
    }
    if (event.which === KEY.S) {
      snakeHead.speedY = 20;
      snakeHead.speedX = 0;
    }
    if (event.which === KEY.W) {
      snakeHead.speedY = -20;
      snakeHead.speedX = 0;
    }
    if (event.which === KEY.A) {
      snakeHead.speedX = -20;
      snakeHead.speedY = 0;
    }
    if (event.which === KEY.D) {
      snakeHead.speedX = 20;
      snakeHead.speedY = 0;
    }
    if (event.which === KEY.RIGHT) {
      snakeHead.speedX = 20;
      snakeHead.speedY = 0;
    }
    if (event.which === KEY.LEFT) {
      snakeHead.speedX = -20;
      snakeHead.speedY = 0;
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
  function getRandomSquare(object) {
    var randomSquare = Math.floor(Math.random() * (BOARD_WIDTH - object.width) / object.width) * object.width;
    return randomSquare;
  }
  function placeSnakeHead() {
    snakeHead.x = getRandomSquare(snakeHead);
    snakeHead.y = getRandomSquare(snakeHead);
    $(snakeHead.id).css("left", snakeHead.x);
    $(snakeHead.id).css("top", snakeHead.y);
  }
  function placeApple() {
    apple.x = getRandomSquare(apple);
    apple.y = getRandomSquare(apple);
    for (var i = 0; i < snake.length; i++) {
      if (apple.x === snake[i].x && apple.y === snake[i].y) {
        placeApple();
      } else {
        $(apple.id).css("left", apple.x);
        $(apple.id).css("top", apple.y);
      }
    }
  }
  function createElement(id) {
    $("<div>").attr("id", id)
      .addClass("snakeBody")
      .appendTo("#board");
  }
  function addBodyPiece() {
    var nextId = "snake" + snake.length;
    createElement(nextId);
    var newPiece = GameItem("#" + nextId);
    snake.push(newPiece);
  }
  function eatsApple() {
    if (apple.x === snakeHead.x && apple.y === snakeHead.y) {
      score += 1;
      if(score % 2 === 0){
        clearInterval(interval);
        frame_rate += 1;
        setInterval(newFrame, frames_per_second_interval);
        }
      $("#score").text(score);
      placeApple();
      addBodyPiece();
      snake[snake.length - 1].x = snake[snake.length - 2].x;
      snake[snake.length - 1].y = snake[snake.length - 2].y;
    }
  }
  function moveSnake() {
    if (snake.length > 1) {
      for (var i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
        $(snake[i].id).css("left", snake[i].x);
        $(snake[i].id).css("top", snake[i].y);
      }
    }
    snakeHead.x += snakeHead.speedX;
    snakeHead.y += snakeHead.speedY;
    $(snakeHead.id).css("left", snakeHead.x);
    $(snakeHead.id).css("top", snakeHead.y);
  }
  function checkForCollisions() {
    //check for wall collisions//
    let collided = wallCollision();
    if (collided === true) {
      endGame();
    }

    //check for snake collistions with itself//
    for(var i = 2; i < snake.length; i++){
      if(snakeHead.x === snake[i].x && snakeHead.y === snake[i].y){
        endGame();
      }
    }
  }
  function wallCollision() {
    if ((snakeHead.y < 0) || (snakeHead.y + $(snakeHead.id).height() > BOARD_HEIGHT) || (snakeHead.x < 0) || (snakeHead.x + $(snakeHead.id).width() > BOARD_WIDTH)) {
      return true;
    } else {
      return false;
    }
  }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
