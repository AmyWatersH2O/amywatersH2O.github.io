/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
  }
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();

  // Other Variables

  var randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);

  // Game Item Objects
  var ball = GameItem("#ball");
  var leftPaddle = GameItem("#leftPaddle");
  var rightPaddle = GameItem("#rightPaddle");

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  startBall();
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveObject(ball);

  }

  /* 
  Called in response to events.
  */

  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      rightPaddle.speedY = -5;
    }
    if (event.which === KEY.DOWN) {
      rightPaddle.speedY = 5;
    }
    if (event.which === KEY.S) {
      leftPaddle.speedY = 5;
    }
    if (event.which === KEY.W) {
      leftPaddle.speedY = -5
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.UP) {
      rightPaddle.speedY = 0;
    }
    if (event.which === KEY.DOWN) {
      rightPaddle.speedY = 0;
    }
    if (event.which === KEY.W) {
      leftPaddle.speedY = 0;
    }
    if (event.which === KEY.S) {
      leftPaddle.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // create factory function to make game item objects

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

  function startBall() {
    ball.css("left", 365);
    ball.css("right", 220);
    ball.speedX = randomNum;
    ball.speedY = randomNum;
  }

  function moveObject(object) {
    object.x = object.x += object.speedX;
    object.y = object.y += object.speedY;
    $(object.id).css("left", object.x);
    $(object.id).css("top", object.y);
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
