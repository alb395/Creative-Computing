var x = 0;
var y = 0;
var cursor; 
var cursorSpeed = 10;
var gauge;

var button, input;

function setup() {
createCanvas(400,400);
background(97,63,117);	

 	// creates an input box
    input = createInput();
    
    // move the text box around
    input.position(width, 0);
    
    // creates a button
    button = createButton('save gauge');

    // move the button around
    button.position(width, input.height);
    
    // button callback function
    button.mousePressed(saveGauge);

    noLoop();
}

function draw() {
	fill(97,63,117);
	noStroke();

	cursor = rect(x, y, gauge);

	x = x + cursorSpeed;

	if(x >= width){
		x = 0;
		y += gauge; //for some reason it's only drawing 2 lines
	}

	// if(y >= height){
	// 	noLoop();
	// }
	
	if(mouseIsPressed){
		fill(255);
		rect(x, y, gauge, gauge);
	}

	// console.log("cursor position " + cursor.X + " cursor position " + cursor.Y);
}

function saveGauge() {
    // save the input in a variable
  	var inputGauge = input.value();
    input.value(''); //clears saved text from the input box
    console.log("selected gauge: " + inputGauge);
    gauge = inputGauge;
    loop();
}
