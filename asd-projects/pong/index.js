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
  var scorePlayer1 = 0;
  var scorePlayer2 = 0
  

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
    moveObject(rightPaddle);
    moveObject(leftPaddle);
    keepPaddleOnBoard(rightPaddle);
    keepPaddleOnBoard(leftPaddle);
    handleBall();
    bounceBallX(rightPaddle);
    bounceBallX(leftPaddle);
    didWin();

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
    ball.x = 365;
    ball.y = 220;
    $(ball.id).css("left", 365);
    $(ball.id).css("top", 220);
    var randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedX = randomNum;
    var randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = randomNum;
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
    // if((object.x  < 0) || (object.x + $(object.id).width() > BOARD_WIDTH)){
    //     return true;
    //   }
  }
      
    function keepPaddleOnBoard(paddle){
      var collided = wallCollision(paddle);
      if(collided === true){
        paddle.y -= paddle.speedY;
      }
    }
    function bounceBallY(){
      let collided = wallCollision(ball);
        if(collided === true){
        ball.speedY *= -1;
      }
     }
     function bounceBallX(paddle){
       let collided = doCollide(ball, paddle);
         if(collided === true){
          var ballMiddleX = (ball.x + ball.width / 2);
          var paddleMiddleX = (paddle.x + paddle.width / 2);
          var ballMiddleY = (ball.y + ball.height / 2);
          var paddleMiddleY = (paddle.y + paddle.height / 2);
      
          var ballRelX = ballMiddleX - paddleMiddleX;
          var ballRelY = ballMiddleY - paddleMiddleY;
      
          var ballDistancePercentX = ballRelX / paddle.width;
          var ballDistancePercentY = ballRelY / paddle.height;
      
          if (Math.abs(ballDistancePercentX) < Math.abs(ballDistancePercentY)) {
            ball.speedY *= -1;
          }
          else {
            ball.speedX *= -1;
          }
      

       }
    }
    function handleBall(){
      if(ball.x < 0){
        scorePlayer1 +=1;
        $("#scorePlayer1").text(scorePlayer1);
        startBall();
      }else if(ball.x + $(ball.id).width() > BOARD_WIDTH){
        scorePlayer2 +=1;
        $("#scorePlayer2").text(scorePlayer2);
        startBall();
      }else {
       bounceBallY();
      }
    }
    function didWin(){
      if(scorePlayer1 === 11 || scorePlayer2 ===11){
        endGame();
      }
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

      if(square1.topY < square2.bottomY && square1.bottomY > square2.topY && square1.rightX > square2.leftX && square1.leftX < square2.rightX){
        return true
        }else{
          return false;
        }
  }
   

  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    alert("Game over!");

    // turn off event handlers
    $(document).off();
  }

}
