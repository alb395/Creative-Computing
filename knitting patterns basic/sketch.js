var x = 0;
var y = 0;
var cursor; 
var cursorSpeed = 20;
var gauge = 5;

function setup() {
createCanvas(400,400);
background(97,63,117);	
}

function draw() {
	fill(0,100,90);
	noStroke();

	cursor = rect(x, y, gauge);

	x = x + cursorSpeed;

	if(x >= width){
		x = 0;
		y += gauge; 
	}

	if(y >= height){
		noLoop();
	}
	
	if(mouseIsPressed){

		fill(255);
		rect(x, y, gauge, gauge);
	}
}
