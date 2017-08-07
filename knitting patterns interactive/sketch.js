var x = 0;
var y = 0;
var speed;
var gauge; // size of the box

var gaugeButton, gaugeInput;
var speedButton, speedInput;

function setup() {
	createCanvas(400,400);
	background(97,63,117);	

	// creates an input box and sets position
	    speedInput = createInput();
	    speedInput.position(width, 0);
	// creates a button and sets position
	    // speedButton = createButton('save speed');
	    // speedButton.position(width, speedInput.height);
	// button callback function
		// speedButton.mousePressed(saveSpeed);

		// creates an input box and sets position
	    gaugeInput = createInput();
	    gaugeInput.position(width, 50);
	// creates a button and sets position
	//     gaugeButton = createButton('save gauge');
	//     gaugeButton.position(width, 50 + gaugeInput.height); 
	// button callback function
		// gaugeButton.mousePressed(saveGauge);

	// go button
		goButton = createButton('Go!');
		goButton.position(width, 100);
		goButton.mousePressed(runPattern);

    noLoop(); // don't run until last input is submitted
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

function saveSpeed() {
	// save the input in a variable
	var userSpeed = speedInput.value();
	speedInput.value('');
	console.log("selected speed: " + userSpeed);
	speed = Number(userSpeed);
}

function saveGauge() {
    // save the input in a variable
  	var userGauge = gaugeInput.value();
    gaugeInput.value(''); //clears saved text from the input box
    console.log("selected gauge: " + userGauge);
    gauge = Number(userGauge);
}

function runPattern(){
	saveGauge();
	saveSpeed();
	loop();
}