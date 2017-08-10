var serial;// variable to hold the serialport library
var portName='/dev/cu.usbmodem1421';// use your serial port name
var inByte=0;

var needlesTouching = 0;
var actualThing = 0;

var x = 0;
var y = 0;
var speed = 0;
var gauge = 0; // size of the box

var text;

var nameBox;
var gaugeSlider, gaugeInput;
var speedSlider, speedInput;

var resetButton;

var nameLabel;

var userName;

// var userSpeed;

function setup() {
	createCanvas(400,500);
	background(97,63,117);	

// serial communication info
	serial=new p5.SerialPort(); // make a new instance of the serialport library
    //serial.on('list', printList);    // set a callback function for the serialport list event
    serial.on('connected',serverConnected);// callback for connecting to the server
    serial.on('open',portOpen);// callback for the port opening
    serial.on('data',serialEvent);// callback for when new data arrives
    serial.on('error',serialError);// callback for errors
    serial.on('close',portClose);// callback for the port closing
    serial.open(portName);// open a serial port

    noStroke();
	fill(255);
	var topBox = rect(0, 0, width, 100);
	fill(0);
	
	text("Title: ", 10, 25);
    nameBox = createInput('');
    nameBox.position(60, 10);
	
	var gaugeLabel = text("Gauge: ", 10, 60);
	// creates an input slider and sets position. (lowVal, highVal, defaultVal, increments)
    gaugeSlider = createSlider(1,100,10,1);
    gaugeSlider.position(60, 47);

	var speedLabel = text("Speed: ", 10, 95);
    speedSlider = createSlider(1,10,5,1);
    speedSlider.position(60, 80);
    

	
 // go button to start the pattern
	goButton = createButton('Go!');
	goButton.position(width - 35, 80);
	goButton.mousePressed(runPattern);

    noLoop(); // don't run until Go button is pressed

    resetButton = createButton('Reset');
    resetButton.position(width, height-20);
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

	// if(mouseIsPressed){
	// 	fill(255);
	// 	rect(x, y, gauge, gauge);
	// }

	// text("gauge selected: " + gauge, 0, 100);  
	//	text("speed selected: " + speed, width/2, height/2);

	fill(97,63,117)
	// rect(200, 60, gauge, gauge);
}
function saveName() {
	userName = nameBox.value();
	nameBox.value('');
	console.log("title is: " + userName);
	
}

function saveGauge() {
    // save the input in a variable
  	var userGauge = gaugeSlider.value();
    // gaugeInput.value(''); //clears entered text from the input box
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
	saveName();
	text(userName, 200, 25);
	text(speed, 200, 95);
	// rectMode(CENTER);
	rect(200, 50, gauge, gauge);
	loop();
}

// I want this to be able to start everything over from scratch. 
// right now it's still allowing one last box to be drawn when the button is pressed
function refresh(){
	setup();
	x = 0;
	y = 0;
}

function serverConnected(){
    console.log('connected to server.');
}

function portOpen(){
     console.log('the serial port opened.');
}

function serialEvent(){
    // needlesTouching = serial.readStringUntil('\r\n'); // hold info in the buffer until you see the control characters, and store that in our inString variable
    // needlesTouching = needlesTouching.trim();
	// if (needlesTouching.length > 0) { //if we have any information, use it!
	//     inByte = Number(needlesTouching);
	//     print(inByte);
	//   }

	needlesTouching = Number(serial.read());

    console.log("serial read is: " + serial.read());
    console.log("needlesTouching variable is: " + needlesTouching);

    	if(needlesTouching == 48){ // why isn't this only applying when the value is 48
		fill(255);
		rect(x, y, gauge, gauge);
	}
}

function serialError(err){
     console.log('Something went wrong with the serial port. '+ err);
}

function portClose(){
     console.log('The serial port closed.');
}