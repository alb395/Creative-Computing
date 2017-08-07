var x = 0;
var y = 0; 
var speed = 5;
var gauge = 20; // size of the box

function setup() {
createCanvas(400,400);
background(97,63,117);	
}

function draw() {
	noStroke();

	x = x + speed;

	// when you reach the end of a line, basically do a line break + carriage return
	if(x >= width){
		x = 0;
		y += gauge; 
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
