var x = 0;
var y = 0;
var speed = 0;
var gauge; // size of the box

var gaugeButton, gaugeInput;
var speedButton, speedInput;

function setup() {
	createCanvas(400,400);
	background(97,63,117);	

	var speedLabel = createP('speed: ');
	speedLabel.position(width, 0);

	// creates an input box and sets position
	    speedInput = createInput();
	    speedInput.position(width, speedLabel.height + 20);

	var gaugeLabel = createP('gauge: ');
	gaugeLabel.position(width, 40);

	// creates an input box and sets position
	    gaugeInput = createInput();
	    gaugeInput.position(width, 80);

	// go button
		goButton = createButton('Go!');
		goButton.position(width, 120);
		goButton.mousePressed(runPattern);

    noLoop(); // don't run until Go button is pressed
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
		rect(x, y, 1.5*gauge, gauge);
	}
}

function saveSpeed() {
	// save the input in a variable
	var userSpeed = speedInput.value();
	// speedInput.value('');
	console.log("selected speed: " + userSpeed);
	speed = Number(userSpeed);

	
}

function saveGauge() {
    // save the input in a variable
  	var userGauge = gaugeInput.value();
    // gaugeInput.value(''); //clears saved text from the input box
    console.log("selected gauge: " + userGauge);
    gauge = Number(userGauge);
}

function runPattern(){
	saveGauge();
	saveSpeed();
	loop();


}