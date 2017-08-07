var x = 0;
var y = 0;
var speed = 10;
var gauge; // size of the box

var button, input;

function setup() {
createCanvas(400,400);
background(97,63,117);	

 	// creates an input box and sets position
    input = createInput();
    input.position(width, 0);
    
    // creates a button and sets position
    button = createButton('save gauge');
    button.position(width, input.height);
    
    // button callback function
    button.mousePressed(saveGauge);

    noLoop(); // don't run until input is submitted
}

function draw() {
	noStroke();

	x = x + speed;

	// when you reach the end of a line, basically do a line break + carriage return
	if(x >= width){
		x = 0;
		y += gauge; //for some reason it's only drawing 2 lines
	}

	// the pattern should only run once.
	if(y >= height){
		noLoop();
	}
	
	if(mouseIsPressed){
		fill(255);
		rect(x, y, gauge, gauge);
	}
}

function saveGauge() {
    // save the input in a variable
  	var userGauge = input.value();
    input.value(''); //clears saved text from the input box
    console.log("selected gauge: " + userGauge);
    gauge = userGauge;
    loop();
}
