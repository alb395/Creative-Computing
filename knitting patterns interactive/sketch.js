var serial;// variable to hold the serialport library
var portName='/dev/cu.usbmodem1421';// use your serial port name
var inByte=0;

var x = 0;
var y = 0;
var speed = 0;
var gauge = 0; // size of the box

var gaugeSlider, gaugeInput;
var speedSlider, speedInput;

var resetButton;

function setup() {
	createCanvas(500,520);
	background(97,63,117);	

 // creates an input slider and sets position
    speedSlider = createSlider(1,20,5,1);
    speedSlider.position(width, 90);

    var speedLabel = createP('speed: ');
	speedLabel.position(width, 50);

    // var speedCurrent = createP(speedSlider.value);
    // speedCurrent.position(width + speedSlider.width, speedLabel.height + 20);

	var gaugeLabel = createP('gauge: ');
	gaugeLabel.position(width, 0);

 // creates an input slider and sets position
    gaugeSlider = createSlider(1,100,10,1);
    gaugeSlider.position(width, 40);

 // go button to start the pattern
	goButton = createButton('Go!');
	goButton.position(width, 120);
	goButton.mousePressed(runPattern);

    noLoop(); // don't run until Go button is pressed

    resetButton = createButton('Reset');
    resetButton.position(width, 150);
    resetButton.mousePressed(refresh);

}

function draw() {
	noStroke();

	x = x + speed;

	// "in the round" version - each line goes left to right
	if(x >= width){
		x = 0;
		y += gauge; 
	}

	// // "flat" version - lines zig zag left to right and right to left
	// I would like this option to be toggle-able with a check box? 
	// if(x >= width){
	// 	speed*-1;
	// 	y += gauge; 
	// }

	// the pattern should only run once.
	if(y >= height - 20){
		noLoop();
	}
	
	if(mouseIsPressed){
		fill(255);
		rect(x, y, gauge, gauge);
	}

	fill(255);
	rect(0, height-20, width, 20);
	fill(0);
	text("gauge selected: " + gauge, 0, height-10);  
	text("speed selected: " + speed, width/2, height-10);
}

function saveGauge() {
    // save the input in a variable
  	var userGauge = gaugeSlider.value();
    // gaugeInput.value(''); //clears saved text from the input box
    console.log("selected gauge: " + userGauge);
    gauge = Number(userGauge);
}

function saveSpeed() {
	// save the input in a variable
	var userSpeed = speedSlider.value();
	// speedInput.value('');
	console.log("selected speed: " + userSpeed);
	speed = Number(userSpeed);
}

function runPattern(){
	saveGauge();
	saveSpeed();
	loop();
}

// I want this to be able to start everything over from scratch. 
// right now it's still allowing one last box to be drawn when the button is pressed
function refresh(){
	setup();
	x = 0;
	y = 0;
}