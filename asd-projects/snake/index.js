/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
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
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
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
    checkForCollision();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      snakeHead.speedY = -3;
      snakeHead.speedX = 0;
    }
    if (event.which === KEY.DOWN) {
      snakeHead.speedY = 3;
      snakeHead.speedX = 0;
    }
    if (event.which === KEY.S) {
      snakeHead.speedY = 3;
      snakeHead.speedX = 0;
    }
    if (event.which === KEY.W) {
      snakeHead.speedY = -3;
      snakeHead.speedX = 0;
    }
    if (event.which === KEY.A) {
      snakeHead.speedX = -3;
      snakeHead.speedY = 0;
    }
    if (event.which === KEY.D) {
      snakeHead.speedX = 3;
      snakeHead.speedY = 0;
    }
    if (event.which === KEY.RIGHT) {
      snakeHead.speedX = 3;
      snakeHead.speedY = 0;
    }
    if (event.which === KEY.LEFT) {
      snakeHead.speedX = -3;
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
      if (doCollide(apple, snakeHead) === true) {
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
  function doCollide(square1, square2) {
    square1.leftX = square1.x;
    square1.topY = square1.y;
    square1.rightX = square1.x + square1.width;
    square1.bottomY = square1.y + square1.height;

    square2.leftX = square2.x;
    square2.topY = square2.y;
    square2.rightX = square2.x + square2.width;
    square2.bottomY = square2.y + square2.height;

    if (square1.topY < square2.bottomY && square1.bottomY > square2.topY && square1.rightX > square2.leftX && square1.leftX < square2.rightX) {
      return true
    } else {
      return false;
    }
  }
  function eatsApple() {
    if (doCollide(apple, snakeHead) === true) {
      score += 1;
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
  function checkForCollision() {
    let collided = wallCollision();
    if (collided === true) {
      endGame();
    }
  }
  function wallCollision() {
    if ((snakeHead.y < 0) || (snakeHead.y + $(snakeHead.id).height() + 5 > BOARD_HEIGHT)) {
      return true;
    } else if ((snakeHead.x < 0) || (snakeHead.x + $(snakeHead.id).width() + 5 > BOARD_WIDTH)) {
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
