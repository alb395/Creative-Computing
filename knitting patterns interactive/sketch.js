var x = 0;
var y = 0;
var speed = 0;
var gauge; // size of the box

var gaugeButton, gaugeInput;
var speedButton, speedInput;

var gaugeSlider;
var speedSlider;

function setup() {
	createCanvas(400,400);
	background(97,63,117);	



// creates an input slider and sets position
    speedSlider = createSlider(1,20,5,1);
    speedSlider.position(width, 40);

    var speedLabel = createP('speed: ');
	speedLabel.position(width, 0);

    // var speedCurrent = createP(speedSlider.value);
    // speedCurrent.position(width + speedSlider.width, speedLabel.height + 20);

	var gaugeLabel = createP('gauge: ');
	gaugeLabel.position(width, 50);

// creates an input slider and sets position
    gaugeSlider = createSlider(0,100,20,5);
    gaugeSlider.position(width, 90);

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
	var userSpeed = speedSlider.value();
	// speedInput.value('');
	console.log("selected speed: " + userSpeed);
	speed = Number(userSpeed);


}

function saveGauge() {
    // save the input in a variable
  	var userGauge = gaugeSlider.value();
    // gaugeInput.value(''); //clears saved text from the input box
    console.log("selected gauge: " + userGauge);
    gauge = Number(userGauge);
}

function runPattern(){
	saveGauge();
	saveSpeed();
	loop();


}