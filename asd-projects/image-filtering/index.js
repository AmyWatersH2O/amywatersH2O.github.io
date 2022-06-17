// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  //applyFilter(reddify);
  //applyFilterNoBackground(decreaseBlue);
  //applyFilterNoBackground(increaseGreenByBlue);
  smudge(pixel1, pixel2);
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction){
  for(var r = 0; r < image.length; r++) { 
    var row = image[r];
    for(var c = 0; c < row.length; c++){
      var rgbString = image[r][c];
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers);
      image[r][c] = rgbString;
    }
  }
}



// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
  var backgroundColor = image[0][0];
  for(var r = 0; r < image.length; r++) { 
    var row = image[r];
    for(var c = 0; c < row.length; c++){
      var rgbString = image[r][c];
      if(backgroundColor !== rgbString){
      var rgbNumbers = rgbStringToArray(rgbString);
      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers);
      image[r][c] = rgbString;
      }
    }
  }
}

// TODO 5: Create the keepInBounds function
function keepInBounds(colorValue){
  var inBounds = Math.min(255, Math.max(0, colorValue));
  return inBounds;
}

// TODO 3: Create reddify function
function reddify(pixelA){
  pixelA[RED] = 200;
}

// TODO 6: Create more filter functions

function decreaseBlue(pixelB){
  pixelB[BLUE] = keepInBounds(pixelB[BLUE] - 50);
  }

function increaseGreenByBlue(pixelC){
  pixelC[GREEN] = keepInBounds(pixelC[GREEN] + pixelC[BLUE]);
}

// CHALLENGE code goes below here


function smudge(pixel1, pixel2) {
	for(var r = image.length-1; r >=0; r--){
		var row = image[r];
		for(var c = row.length - 2; c >= 0; c--){
			var pixel1 = image[r][c];
      var pixel2 = image[r][c+1];
			var rgbNumbers1 = rgbStringToArray(pixel1);
      var rgbNumbers2 = rgbStringToArray(pixel2);
			var newColor1 = keepInBounds(rgbNumbers1[RED] - (rgbNumbers1[RED] * .25));	
      var newColor2 = keepInBounds(rgbNumbers2[RED] + (rgbNumbers1[RED] * .25));
			rgbNumbers1 = [newColor1, rgbNumbers1[GREEN], rgbNumbers1[BLUE]];
      rgbNumbers2 = [newColor2, rgbNumbers2[GREEN], rgbNumbers[BLUE]];
      pixel1 = rgbArrayToString(rgbNumbers1);
      pixel2 = rgbArrayToString(rgbNumbers2);
    }
  }
}
