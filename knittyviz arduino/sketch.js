var serial;// variable to hold the serialport library
var portName='/dev/cu.usbmodem1421';// use your serial port name
var inByte=0;

var needlesTouching = 0;
var actualThing = 0;

var x = 0;
var y = 0;
var speed = 0;
var gauge = 0; // size of the box

var gaugeSlider, gaugeInput;
var speedSlider, speedInput;

var resetButton;

function setup() {
	createCanvas(400,420);
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
	
	if(needlesTouching == 48){ // why isn't this only applying when the value is 48
		fill(255);
		rect(x, y, gauge, gauge);
	}

	// if(mouseIsPressed){
	// 	fill(255);
	// 	rect(x, y, gauge, gauge);
	// }

	fill(255);
	rect(0, height-20, width, 20);
	fill(0);
	text("gauge selected: " + gauge, 0, height-10);  
	text("speed selected: " + speed, width/2, height-10);
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
}

function serialError(err){
     console.log('Something went wrong with the serial port. '+ err);
}

function portClose(){
     console.log('The serial port closed.');
}