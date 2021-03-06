var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with an obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth, 1000, "#000000");
            //var backgroundFill = draw.bitmap("img/sea-floor-5.png");
            //backgroundFill.scaleY = canvasHeight;
            //backgroundFill.scaleX = canvasWidth;
            background.addChild(backgroundFill);
            
            
            // TODO: 3 - Add a moon and starfield
           
            var moon = draw.bitmap('img/moon.png');
            moon.x = 200;
            moon.y = 200;
            moon.scaleX = 10;
            moon.scaleY = 10;
            background.addChild(moon);

            for(var i; i<150, i++){
            var circle = draw.circle(10, 'white', 'LightGray', 2);
            circle.x = canvasWidth*Math.random();
            circle.y = groundY*Math.random();
            background.addChild(circle);
            };
            
            /*var seaWeed = draw.bitmap("img/seaweed-rocks1.png");
            seaWeed.x = 100;
            seaWeed.y = 1;
            //seaWeed.scaleX = 10.0;
            //seaWeed.scaleY = 10.0;
            background.addChild(seaWeed);

            var fish = draw.bitmap("img/fish1.png");
            //fish.scaleX = 100;
            //fish.scaleY = 100;
            fish.x = canvasWidth*Math.random();
            fish.y = groundY*Math.random();
            background.addChild(fish);

            var shark = draw.bitmap("img/shark.png");
            shark.x = canvasWidth*Math.random();
            shark.y = groundY*Math.random();
            shark.scaleX = 10;
            shark.scaleY = 10;
            background.addChild(shark);
            /*
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            
            // TODO 4: Part 1 - Add a tree
            
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            
            
            // TODO 5: Part 2 - Parallax
            

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
