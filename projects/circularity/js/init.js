var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
              // TODO 1: Declare our variables //
         var circle;		// variable to hold a single circle when creating circles / iterating
         var circles = [];	// variable to store all circles in one Array

        // TODO 2 : Create a function that draws a circle 
        function drawCircle(){
            circle = draw.randomCircleInArea(canvas, true, true, '#999', 2);
            physikz.addRandomVelocity(circle, canvas, 5, 5);
            view.addChild(circle);
            circles.push(circle);

        }

        // TODO 3 / 8 : Call the drawCircle() function 
        for(var loopsCompleted = 1; loopsCompleted <= 100; loopsCompleted++){
            drawCircle();
        }
        

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
            var eachCircle =0
            for (var i = 0; i < circles.length; i++){
                eachCircle = circles[i];
                physikz.updatePosition(eachCircle);
            //The hardcoded function physikz.updatePosition() calls were replaced by the iteration
                        
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
                game.checkCirclePosition(eachCircle);
            //The hardcoded function calls of game.checkCirclePosition() were replaced by the same iteration above.

            // TODO 9 : Iterate over the array
           
            }
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
       

        game.checkCirclePosition = function(circle) {
            var topEdge = circle.y - circle.radius;
            var bottomEdge = circle.y + circle.radius;
            var rightEdge = circle.x + circle.radius;
            var leftEdge = circle.x - circle.radius;

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if (leftEdge > canvas.width ) {
                circle.x = 0;
            }
            // if the circle has gone past the LEFT side of the screen then place it on the RIGHT
            if (rightEdge < 0){
                circle.x = canvas.width;
            }
            // if the circle has gone past the TOP of the screen then place it on the BOTTOM
            if (topEdge > canvas.height){
                circle.y = 0;
            }
            // if the circle has gone past the BOTTOM of the screen then place it on the TOP
            if (bottomEdge < 0){
                circle.y = canvas.height;
            }
            // TODO 7 : YOUR CODE STARTS HERE //////////////////////
            


            // YOUR TODO 7 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}